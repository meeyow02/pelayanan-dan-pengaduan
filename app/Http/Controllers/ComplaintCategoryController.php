<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComplaintCategoryRequest;
use App\Services\ComplaintCategoryService;
use DB;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplaintCategoryController extends Controller
{
    public function __construct(
        private ComplaintCategoryService $complaintCategoryService
    ) {
    }

    public function index(Request $request)
    {
        $complaintCategories = $this->complaintCategoryService->getAll($request->get('search'));

        return Inertia::render('Master Data/Complaint Category/Index', compact('complaintCategories'));
    }

    public function create()
    {
        return Inertia::render('Master Data/Complaint Category/Form');
    }

    public function store(ComplaintCategoryRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            $this->complaintCategoryService->store($validated);

            DB::commit();

            return redirect()
                ->route('complaint-category.index')
                ->with('success', 'Kategori aduan berhasil disimpan');

        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menyimpan kategori aduan. ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $complaintCategory = $this->complaintCategoryService->findById($id);

        return Inertia::render('Master Data/Complaint Category/Form', [
            'complaintCategory' => $complaintCategory,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $this->complaintCategoryService->update($id, $request->all());

            DB::commit();

            return redirect()
                ->route('complaint-category.index')
                ->with('success', 'Kategori aduan berhasil diperbarui');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui kategori aduan. ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $complaintCategory = $this->complaintCategoryService->findById($id);

            if (!$complaintCategory) {
                return redirect()
                    ->back()
                    ->with('error', 'Kategori aduan tidak ditemukan');
            }

            DB::beginTransaction();

            $this->complaintCategoryService->delete($id);

            DB::commit();

            return redirect()
                ->route('complaint-category.index')
                ->with('success', 'Kategori aduan berhasil dihapus');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus kategori aduan');
        }
    }
}
