<?php

namespace App\Repositories;

use App\Models\ComplaintCategory;

class ComplaintCategoryRepository implements ComplaintCategoryRepositoryInterface
{
    protected $ComplaintCategory;

    public function __construct(ComplaintCategory $ComplaintCategory)
    {
        $this->ComplaintCategory = $ComplaintCategory;
    }

    public function getAll($search = null)
    {
        $query =  $this->ComplaintCategory;

        if ($search) {
            $query->where('name', 'LIKE', '%' . $search . '%');
        }

        return $query->paginate(10);
    }

    public function findById(int $id)
    {
        return $this->ComplaintCategory::find($id);
    }

    public function store(array $data)
    {
        return $this->ComplaintCategory::create($data);
    }

    public function update(int $id, array $data)
    {
        $model = $this->findById($id);
        return $model ? $model->update($data) : null;
    }

    public function delete(int $id)
    {
        $model = $this->findById($id);
        return $model ? $model->delete() : null;
    }
}