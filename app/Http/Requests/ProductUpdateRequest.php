<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'nullable|string',
            'price' => 'nullable|numeric'
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'အမည်သည်စာသားဖြစ်ရပါမည်။',
            'price.numeric' => 'ဈေးနှုန်းသည်ဂဏန်းဖြစ်ရပါမည်။'
        ];
    }
}