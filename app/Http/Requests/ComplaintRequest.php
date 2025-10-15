<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ComplaintRequest extends FormRequest
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
            'complaint_category_id' => ['required', 'exists:complaint_categories,id'],
            'content' => ['required', 'string'],
            'filename' => ['nullable', 'file'],
        ];
    }

    public function messages()
    {
        return [
            'complaint_category_id.required' => 'Kategori aduan harus diisi',
            'complaint_category_id.exists' => 'Kategori aduan yang dipilih tidak terdaftar',
            'content.required' => 'Isi aduan harus diisi',
            'content.string' => 'Isi aduan harus berupa teks',
        ];
    }
}
