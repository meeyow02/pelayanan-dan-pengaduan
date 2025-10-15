<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Services\ServiceCategoryService;
use App\Services\ServiceFileService;
use App\Services\ServiceService;
use DB;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;
use Str;

class ServiceController extends Controller
{
    public function __construct(
        private ServiceService $serviceService,
        private ServiceCategoryService $serviceCategoryService,
        private ServiceFileService $serviceFileService
    ) {
    }

    public function index()
    {
        $services = $this->serviceService->getAll();
        return Inertia::render('Service/Index', compact('services'));
    }

    public function create()
    {
        $serviceCategories = $this->serviceCategoryService->getAll();
        return Inertia::render('Service/Create', compact('serviceCategories'));
    }

    public function store(ServiceRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $validated['user_id'] = auth()->user()->id;

            $service = $this->serviceService->store($validated);
            
            if ($request->hasFile('files')) {
                $files = $request->file('files');
                foreach ($files as $file) {
                    $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
                    $file->storeAs('service', $filename, 'public');
                    $this->serviceFileService->store([
                        'service_id' => $service->id,
                        'filename' => $filename,
                    ]);
                }
            }

            DB::commit();

            return redirect()
                ->route('service.index')
                ->with('success', 'Permohonan berhasil disimpan');

        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menyimpan permohonan. ' . $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $service = $this->serviceService->findById($id);

            if (!$service) {
                return redirect()
                    ->route('service.index')
                    ->with('error', 'Permohonan tidak ditemukan');
            }

            return Inertia::render('Service/Detail', compact('service'));
        } catch (Exception $e) {
            return redirect()
                ->route('service.index')
                ->with('error', 'Gagal memuat detail permohonan');
        }
    }

    public function destroy($id)
    {
        try {
            $service = $this->serviceService->findById($id);

            if (!$service) {
                return redirect()
                    ->back()
                    ->with('error', 'Permohonan tidak ditemukan');
            }

            DB::beginTransaction();

            dd($service->files);

            if ($service->ser && Storage::disk('public')->exists('service/' . $service->filename)) {
                Storage::disk('public')->delete('service/' . $service->filename);
            }

            $this->serviceService->delete($id);

            DB::commit();

            return redirect()
                ->route('service.index')
                ->with('success', 'Permohonan berhasil dihapus');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus permohonan');
        }
    }
}
