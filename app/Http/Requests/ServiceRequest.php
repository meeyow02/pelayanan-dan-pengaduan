<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'service_category_id' => ['required', 'exists:service_categories,id'],
            'files' => ['required'],
            'description' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'service_category_id.required' => 'Kategori layanan harus diisi',
            'service_category_id.exists' => 'Kategori layanan yang dipilih tidak terdaftar',
            'files.required' => 'Dokumen harus diisi',
            'description.required' => 'Isi deskripsi harus berupa teks',
        ];
    }
}
