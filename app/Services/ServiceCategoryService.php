<?php

namespace App\Services;

use App\Repositories\ServiceCategoryRepositoryInterface;

class ServiceCategoryService
{
    public function __construct(
        protected ServiceCategoryRepositoryInterface $ServiceCategoryRepository
    ) {
    }

    public function getAll($search = null)
    {
        return $this->ServiceCategoryRepository->getAll($search);
    }

    public function findById(int $id)
    {
        return $this->ServiceCategoryRepository->findById($id);
    }

    public function store(array $data)
    {
        return $this->ServiceCategoryRepository->store($data);
    }

    public function update(int $id, array $data)
    {
        return $this->ServiceCategoryRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->ServiceCategoryRepository->delete($id);
    }
}