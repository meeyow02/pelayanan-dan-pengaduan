<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceCategoryRequest;
use App\Services\ServiceCategoryService;
use DB;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceCategoryController extends Controller
{
    public function __construct(
        private ServiceCategoryService $serviceCategoryService
    ) {
    }

    public function index(Request $request)
    {
        $search = $request->get('search');
        $limit = $request->get('limit', 10);
        $serviceCategories = $this->serviceCategoryService->getAll($search, $limit);

        return Inertia::render('Master Data/Service Category/Index', compact('serviceCategories'));
    }

    public function create()
    {
        return Inertia::render('Master Data/Service Category/Form');
    }

    public function store(ServiceCategoryRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            $this->serviceCategoryService->store($validated);

            DB::commit();

            return redirect()
                ->route('service-category.index')
                ->with('success', 'Kategori pelayanan berhasil disimpan');

        } catch (Exception $e) {
            DB::rollBack(); 

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menyimpan kategori pelayanan. ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $serviceCategory = $this->serviceCategoryService->findById($id);

        return Inertia::render('Master Data/Service Category/Form', [
            'serviceCategory' => $serviceCategory,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $this->serviceCategoryService->update($id, $request->all());

            DB::commit();

            return redirect()
                ->route('service-category.index')
                ->with('success', 'Kategori pelayanan berhasil diperbarui');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui kategori pelayanan. ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $serviceCategory = $this->serviceCategoryService->findById($id);

            if (!$serviceCategory) {
                return redirect()
                    ->back()
                    ->with('error', 'Kategori pelayanan tidak ditemukan');
            }

            DB::beginTransaction();

            $this->serviceCategoryService->delete($id);

            DB::commit();

            return redirect()
                ->route('service-category.index')
                ->with('success', 'Kategori pelayanan berhasil dihapus');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus kategori pelayanan');
        }
    }
}
