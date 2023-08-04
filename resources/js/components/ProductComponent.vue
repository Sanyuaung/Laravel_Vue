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
                        <input
                            type="text"
                            placeholder="Search"
                            class="form-control"
                        />
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
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label class="mb-2">Name: </label>
                                <input v-model="product.name" type="text" class="form-control mb-2" />
                            </div>
                            <div class="form-group">
                                <label class="mb-2">Price: </label>
                                <input v-model="product.price"
                                    type="number"
                                    class="form-control mb-2"
                                />
                            </div>
                            <button class="btn btn-primary" type="submit">
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
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <button class="btn btn-success btn-sm">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i> Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ProductComponent",
    data() {
        return {
            products: [],
            product: {
                name: '',
                price: ''
            }
        };
    },
    methods: {
        view() {
            axios
                .get("/api/product")
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        store() {
            axios
                .post("/api/product", this.product)
                .then(response => {
                    this.view();
                    this.product = {
                        name: '',
                        price: ''
                    }
                }
                )
        }
    },
    created() {
        this.view();
    },
};
</script>
