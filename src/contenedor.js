const fs = require("fs/promises");

class Contenedor {
    constructor(archivo) { this.archivo = archivo; }
    getAll = async () => {
        try {
            const archivo = await fs.readFile(this.archivo, "utf-8");
            const lista = await JSON.parse(archivo);
            return lista
        } catch (error) {
            console.log(error)
        }
    };
    saveList = async (nuevaLista) => {
        try {
            await fs.writeFile(this.archivo, nuevaLista);
        } catch (error) {
            console.log(error)
        }
    }
    saveNewProduct = async (product) => {
        const lista = await this.getAll();
        const lastId = lista.length ? lista[lista.length - 1].id : 0;
        product.id = lastId + 1;
        lista.push(product);
        const nuevaLista = JSON.stringify(lista, null, 2);
        await this.saveList(nuevaLista);
        return product.id
    }
    getById = async (id) => {
        try {
            const lista = await this.getAll();
            
            const productById = lista.find(product => product.id == id);

            const resultado = productById ? productById : null;

            return resultado;
        } catch (error) {
            console.log(error);
        }
        hola;
    }

    deleteById = async (id) => {
        const lista = await this.getAll();

        const producto = await this.getById(id);

        if (producto) {
            const nuevaLista = lista.filter(product => product.id != id);

            const nuevaListaJson = JSON.stringify(nuevaLista, null, 2)

            await this.saveList(nuevaListaJson);

            return producto;
        } else {
            return null;
        }
    };

    updateById = async (id, newProduct) => {
        
        let lista = await this.getAll();

        const index = lista.findIndex(product => product.id == id);

        let producto = lista[index];

        if (producto) {
            const { title, price, thumbnail } = newProduct;

            producto.title = title;
            producto.price = price;
            producto.thumbnail = thumbnail;

            lista[index] = producto;
            
            const nuevaListaJson = JSON.stringify(lista, null, 2)
            
            await this.saveList(nuevaListaJson);

            return producto
        } else {
            return null
        }
    }

    deleteAll = () => this.saveList('[]');

}

module.exports = Contenedor;