<?php

namespace App\Repositories;

use App\Models\ServiceCategory;

class ServiceCategoryRepository implements ServiceCategoryRepositoryInterface
{
    protected $ServiceCategory;

    public function __construct(ServiceCategory $ServiceCategory)
    {
        $this->ServiceCategory = $ServiceCategory;
    }

    public function getAll($search = null)
    {
        $query =  $this->ServiceCategory;

        if ($search) {
            $query->where('name', 'LIKE', '%' . $search . '%');
        }

        return $query->paginate(10);
    }

    public function findById(int $id)
    {
        return $this->ServiceCategory::find($id);
    }

    public function store(array $data)
    {
        return $this->ServiceCategory::create($data);
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