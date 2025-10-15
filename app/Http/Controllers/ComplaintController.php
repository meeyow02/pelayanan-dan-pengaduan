<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComplaintRequest;
use App\Services\ComplaintCategoryService;
use App\Services\ComplaintService;
use DB;
use Exception;
use Inertia\Inertia;
use Str;

class ComplaintController extends Controller
{
    public function __construct(
        private ComplaintService $complaintService,
        private ComplaintCategoryService $complaintCategoryService
    ) {
    }

    public function index()
    {
        $complaints = $this->complaintService->getAll();
        return Inertia::render('Complaint/Index', compact('complaints'));
    }

    public function create()
    {
        $complaintCategories = $this->complaintCategoryService->getAll();
        return Inertia::render('Complaint/Create', compact('complaintCategories'));
    }

    public function store(ComplaintRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $validated['user_id'] = auth()->user()->id;

            if ($request->hasFile('filename')) {
                $file = $request->file('filename');
                $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
                $validated['filename'] = $filename;
                $file->storeAs('complaint', $filename, 'public');
            }

            $this->complaintService->store($validated);

            DB::commit();

            return redirect()
                ->route('complaint.index')
                ->with('success', 'Aduan berhasil disimpan');

        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menyimpan aduan. ' . $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $complaint = $this->complaintService->findById($id);

            if (!$complaint) {
                return redirect()
                    ->route('complaint.index')
                    ->with('error', 'Aduan tidak ditemukan');
            }

            return Inertia::render('Complaint/Detail', compact('complaint'));

        } catch (Exception $e) {
            return redirect()
                ->route('complaint.index')
                ->with('error', 'Gagal memuat detail aduan');
        }
    }
}
