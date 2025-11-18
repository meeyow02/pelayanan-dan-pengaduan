<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserListRequest;
use App\Services\UserListService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;
use Exception;

class UserListController extends Controller
{
    public function __construct(
        protected UserListService $userListService
    ) {}

    public function index(Request $request)
    {
        $userList = $this->userListService->getAll($request->get('search'));

        return Inertia::render('User List/Index', compact('userList'));
    }

    public function create()
    {
        return Inertia::render('User List/Form');
    }

    public function store(UserListRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            $this->userListService->store($validated);

            DB::commit();

            return redirect()
                ->route('user-list.index')
                ->with('success', 'Berhasil menambahkan user');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menambahkan user. ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $userList = $this->userListService->findById($id);

        return Inertia::render('User List/Form', [
            'userList' => $userList,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $this->userListService->update($id, $request->all());

            DB::commit();

            return redirect()
                ->route('user-list.index')
                ->with('success', 'Data user berhasil diperbarui');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui data user. ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $complaintCategory = $this->userListService->findById($id);

            if (!$complaintCategory) {
                return redirect()
                    ->back()
                    ->with('error', 'User tidak ditemukan');
            }

            DB::beginTransaction();

            $this->userListService->delete($id);

            DB::commit();

            return redirect()
                ->route('user-list.index')
                ->with('success', 'User berhasil dihapus');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus user');
        }
    }
}
