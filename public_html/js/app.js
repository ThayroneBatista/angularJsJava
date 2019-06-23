var app = angular.module('produtosApp', []);

app.controller('ProdutosController', function ($scope, ProdutosService) {
    var novo = true;
    $scope.produto = {};
    var salvar;
    var salvar;


    listar();

    function listar() {
        ProdutosService.listar().then(function (res) {
            $scope.produtos = res.data;
        });
    }

    $scope.salvar = function (produto) {
        ProdutosService.salvar(produto, novo).then(function (res) {
            listar();
            console.log(res);
        });
        $scope.produto = {};
        novo = true;
    };

    $scope.excluir = function (produto) {
        ProdutosService.excluir(produto).then(function (res) {
            listar();
            console.log(res);
        });
    };

    $scope.editar = function (produto) {
        $scope.produto = angular.copy(produto);
        novo = false;
    };
    $scope.cancelar = function () {
        $scope.produto = {};
    };
});

app.service('ProdutosService', function ($http) {
    var api = 'http://localhost:8080/api/webresources/produtos';
    this.listar = function () {
        return $http.get(api);
    }

    this.salvar = function (produto, novo) {
        if (!novo) {
            return $http.put(api + "/" + produto.id, produto);
        } else {
            return $http.post(api, produto);
        }
    }

    this.excluir = function (produto) {
        return $http.delete(api + "/" + produto.id);
    }
});