<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;

class AuthController extends Controller
{
    public function changePassword()
    {
        return Inertia::render('Auth/ChangePassword');
    }

    public function updatePassword(Request $request)
    {
        try {
            $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', 'min:8', 'confirmed'],
            ]);

            if (Hash::check($request->password, auth()->user()->password)) {
                return redirect()->back()->with('error', 'Password baru tidak boleh sama dengan password lama!');
            }

            $user = auth()->user();
            $user->password = Hash::make($request->password);
            $user->save();

            return redirect()->back()->with('success', 'Password berhasil diubah!');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal mengubah password. ' . $e->getMessage());
        }
    }
}
