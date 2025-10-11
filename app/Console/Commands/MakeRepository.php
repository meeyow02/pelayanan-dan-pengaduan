<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class MakeRepository extends Command
{
    protected $signature = 'make:repository {name}';
    protected $description = 'Generate a Repository and Interface with basic CRUD methods';

    public function handle()
    {
        $name = $this->argument('name');
        $filesystem = new Filesystem();

        $interfacePath = app_path("Repositories/{$name}RepositoryInterface.php");
        $repositoryPath = app_path("Repositories/{$name}Repository.php");
        $servicePath = app_path("Services/{$name}Service.php");

        // Buat folder jika belum ada
        if (!$filesystem->isDirectory(app_path('Repositories'))) {
            $filesystem->makeDirectory(app_path('Repositories'), 0755, true);
        }

        // Buat folder service jika belum ada
        if (!$filesystem->isDirectory(app_path('Services'))) {
            $filesystem->makeDirectory(app_path('Services'), 0755, true);
        }

        // Buat file Interface
        if (!$filesystem->exists($interfacePath)) {
            $filesystem->put($interfacePath, $this->getInterfaceTemplate($name));
            $this->info("{$name}RepositoryInterface.php created successfully.");
        } else {
            $this->error("{$name}RepositoryInterface.php already exists.");
        }

        // Buat file Repository
        if (!$filesystem->exists($repositoryPath)) {
            $filesystem->put($repositoryPath, $this->getRepositoryTemplate($name));
            $this->info("{$name}Repository.php created successfully.");
        } else {
            $this->error("{$name}Repository.php already exists.");
        }

        // Buat file Service
        if (!$filesystem->exists($servicePath)) {
            $filesystem->put($servicePath, $this->getServiceTemplate($name));
            $this->info("{$name}Service.php created successfully.");
        } else {
            $this->error("{$name}Service.php already exists.");
        }
    }

    protected function getInterfaceTemplate($name)
    {
        return <<<PHP
        <?php

        namespace App\Repositories;

        interface {$name}RepositoryInterface
        {
            public function getAll(string \$search);
            public function findById(int \$id);
            public function findByUuid(string \$uuid);
            public function store(array \$data);
            public function update(int \$id, array \$data);
            public function delete(int \$id);
        }
        PHP;
    }

    protected function getRepositoryTemplate($name)
    {
        return <<<PHP
        <?php

        namespace App\Repositories;

        use App\Models\\$name;

        class {$name}Repository implements {$name}RepositoryInterface
        {
            protected \${$name};

            public function __construct($name \${$name})
            {
                \$this->{$name} = \${$name};
            }

            public function getAll(\$search = null)
            {
                \$query =  \$this->{$name}::with('replacethis');

                if (\$search) {
                    \$query->whereHas('replacethis', function (\$q) use (\$search) {
                        \$q->where('replacethis', 'LIKE', '%' . \$search . '%');
                    })
                }

                return \$query->paginate(10);
            }

            public function findById(int \$id)
            {
                return \$this->{$name}::find(\$id);
            }

            public function findByUuid(string \$uuid)
            {
                return \$this->{$name}::where('uuid', \$uuid)->first();
            }

            public function store(array \$data)
            {
                return \$this->{$name}::create(\$data);
            }

            public function update(int \$id, array \$data)
            {
                \$model = \$this->findById(\$id);
                return \$model ? \$model->update(\$data) : null;
            }

            public function delete(int \$id)
            {
                \$model = \$this->findById(\$id);
                return \$model ? \$model->delete() : null;
            }
        }
        PHP;
    }

    protected function getServiceTemplate($name)
    {
        return <<<PHP
        <?php

        namespace App\Services;

        use App\Repositories\\{$name}RepositoryInterface;

        class {$name}Service
        {
            public function __construct(
                protected {$name}RepositoryInterface \${$name}Repository
            ) {
            }

            public function getAll(\$search = null)
            {
                return \$this->{$name}Repository->getAll(\$search);
            }

            public function findById(int \$id)
            {
                return \$this->{$name}Repository->findById(\$id);
            }

            public function findByUuid(string \$uuid)
            {
                return \$this->{$name}Repository->findByUuid(\$uuid);
            }

            public function store(array \$data)
            {
                return \$this->{$name}Repository->store(\$data);
            }

            public function update(int \$id, array \$data)
            {
                return \$this->{$name}Repository->update(\$id, \$data);
            }

            public function delete(int \$id)
            {
                return \$this->{$name}Repository->delete(\$id);
            }
        }
        PHP;
    }
}
