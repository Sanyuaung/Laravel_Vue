<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-4">
                <button class="btn btn-primary" @click="create">
                    <i class="fas fa-plus-circle"></i> Create
                </button>
            </div>
            <div class="col-4">
                <form @submit.prevent="view">
                    <div class="input-group">
                        <input
                            v-model="search"
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
                    <h4 class="card-header">
                        {{ isEditMode ? "Edit" : "Create" }}
                    </h4>
                    <div class="card-body">
                        <AlertError
                            :form="product"
                            :message="message"
                        ></AlertError>
                        <form
                            @submit.prevent="isEditMode ? update() : store()"
                            @keydown="product.onKeydown($event)"
                        >
                            <div class="form-group mb-2">
                                <label class="mb-2">Name: </label>
                                <input
                                    :class="{
                                        'is-invalid':
                                            product.errors.has('name'),
                                    }"
                                    v-model="product.name"
                                    type="text"
                                    class="form-control mb-2"
                                />
                                <HasError :form="product" field="name" />
                            </div>
                            <div class="form-group mb-2">
                                <label class="mb-2">Price: </label>
                                <input
                                    :class="{
                                        'is-invalid':
                                            product.errors.has('price'),
                                    }"
                                    v-model="product.price"
                                    type="number"
                                    class="form-control mb-2"
                                />
                                <HasError :form="product" field="price" />
                            </div>
                            <button
                                class="btn btn-primary"
                                type="submit"
                                :disabled="product.busy"
                            >
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
                        <tr v-for="product in products.data" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <button
                                    class="btn btn-success btn-sm"
                                    @click="edit(product)"
                                >
                                    <i class="fas fa-edit"></i> Edit</button
                                >&nbsp
                                <button
                                    class="btn btn-danger btn-sm"
                                    @click="destory(product.id)"
                                >
                                    <i class="fas fa-trash-alt"></i> Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Bootstrap5Pagination
                    :data="products"
                    @pagination-change-page="view"
                ></Bootstrap5Pagination>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import Form from "vform";
import { Button, HasError, AlertError } from "vform/src/components/bootstrap5";
import Swal from "sweetalert2";

export default {
    name: "ProductComponent",
    components: {
        Bootstrap5Pagination,
        Button,
        HasError,
        AlertError,
        Swal,
    },
    data() {
        return {
            message: "",
            isEditMode: false,
            search: "",
            products: {},
            product: new Form({
                id: "",
                name: "",
                price: "",
            }),
        };
    },
    methods: {
        view(page = 1) {
            this.$Progress.start();
            axios
                .get(`/api/product?page=${page}&search=${this.search}`)
                .then((response) => {
                    this.products = response.data;
                    this.$Progress.finish();
                })
                .catch((error) => {
                    this.$Progress.fail();
                });
        },
        create() {
            this.product.clear();
            this.isEditMode = false;
            this.product.reset();
        },
        store() {
            this.product
                .post("/api/product")
                .then((response) => {
                    this.view();
                    this.product.reset();
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Created successfully",
                    });
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                });
        },
        edit(product) {
            this.product.clear();
            this.isEditMode = true;
            this.product.fill(product);
        },
        update() {
            this.product
                .put(`/api/product/${this.product.id}`)
                .then((response) => {
                    this.view();
                    this.isEditMode = false;
                    this.product.reset();
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener(
                                "mouseenter",
                                Swal.stopTimer
                            );
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer
                            );
                        },
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Updated successfully",
                    });
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                });
        },
        destory(id) {
            Swal.fire({
                title: "Are you sure?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/product/${id}`).then((response) => {
                        this.view();
                        // Swal.fire({
                        //     title: "Deleted!",
                        //     icon: "success",
                        // });
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener(
                                    "mouseenter",
                                    Swal.stopTimer
                                );
                                toast.addEventListener(
                                    "mouseleave",
                                    Swal.resumeTimer
                                );
                            },
                        });

                        Toast.fire({
                            icon: "success",
                            title: "Deleted successfully",
                        });
                    });
                }
            });
        },
    },
    created() {
        this.view();
    },
};
</script>
