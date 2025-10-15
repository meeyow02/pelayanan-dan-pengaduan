<?php

namespace App\Services;

use App\Repositories\ComplaintCategoryRepositoryInterface;

class ComplaintCategoryService
{
    public function __construct(
        protected ComplaintCategoryRepositoryInterface $ComplaintCategoryRepository
    ) {
    }

    public function getAll($search = null)
    {
        return $this->ComplaintCategoryRepository->getAll($search);
    }

    public function findById(int $id)
    {
        return $this->ComplaintCategoryRepository->findById($id);
    }

    public function store(array $data)
    {
        return $this->ComplaintCategoryRepository->store($data);
    }

    public function update(int $id, array $data)
    {
        return $this->ComplaintCategoryRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->ComplaintCategoryRepository->delete($id);
    }
}