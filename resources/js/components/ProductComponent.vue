<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-4">
                <button class="btn btn-primary">
                    <i class="fas fa-plus-circle"></i> Create
                </button>
            </div>
            <div class="col-4">
                <form>
                    <div class="input-group">
                        <input type="text" placeholder="Search" class="form-control">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <h4 class="card-header">Create</h4>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label class="mb-2">Name: </label>
                                <input type="text" class="form-control mb-2">
                            </div>
                            <div class="form-group">
                                <label class="mb-2">Price: </label>
                                <input type="number" class="form-control mb-2">
                            </div>
                            <button class="btn btn-primary">
                                <i class="fas fa-save"></i> Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Book</td>
                            <td>1000</td>
                            <td>
                                <button class="btn btn-success btn-sm"><i class="fas fa-edit"></i> Edit</button>
                                <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        
    }
}
</script>