'use strict'
const Identitas = use('App/Models/Identita')
const Sarana = use('App/Models/Sarana')
const Kodefikasi = use('App/Models/Kodefikasi')
const { validate } = use('Validator')
const Helpers = use('Helpers')
const Database = use('Database')

class IdentitaController {
    async searchAllKode ({request, response}) {
        // const sarana = await Database.select('id', 'nama').from('sarana')
        // const kodefikasi = await Database.select('id', 'kode', 'nama').from('kodefikasi')
        // const klasifikasi = await Database.select('id', 'nama').from('klasifikasi')
        // const identitas = await Database.select('tahun', 'nomor_urut').from('identitas')
        // const galeri = await Database.select('gambar').from('galeri')
        const kodefikasi =  await Database.select('id','kode','nama').from('kodefikasi')

        const sarana = await kodefikasi.sarana().fetch()

        return response.json({
            message: 'Search Data',
            result: sarana
        })
    }

    async searchKode ({request, response}) {
        const sarana = await Sarana.query().with('kodefikasi').with('klasifikasi').with('identitas').with('galeri').fetch()

        return response.json({
            message: 'Search Data',
            result: sarana
        })
    }

    async showIdentitas({request, response}) {
        const identitas = await Identitas.query().with('users').with('klasifikasi').fetch()

        return response.json({
            status: 200,
            message: 'Success',
            data: identitas 
        })
    }

    async identitasId({request, response, params}) {
        const identitas = await Identitas.query().where('id', params.id).with('users').with('klasifikasi').fetch()

        return response.json({
            status: 200,
            message: 'Success',
            data: identitas
        })
    }

    async addIdentitas({request, response}) {
        const rules = {
            user_id: 'required|exists:users,id',
            klasifikasi_id : 'required|exists:klasifikasi,id',
            tahun : 'required',
            nomor_urut : 'required',
            deskripsi: 'required'
        }

        // const identitas_req = request.only(['klasifikasi_id', 'tahun', 'nomor_urut'])
        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.json({
                message : validation.messages()
        })
        }

        const identitas = new Identitas()
        identitas.user_id = request.body.user_id
        identitas.klasifikasi_id = request.body.klasifikasi_id
        identitas.tahun = request.body.tahun
        identitas.nomor_urut = request.body.nomor_urut

        const myPicture = request.file('gambar', {
            types: ['image'],
            size: '2mb'
        })

        await myPicture.move(Helpers.publicPath('uploads/identitas'), {
            name: identitas.gambar,
            overwrite: true
        })
        identitas.gambar = new Date().getTime()+'.'+myPicture.subtype

        identitas.deskripsi = request.body.deskripsi        

        await identitas.save();

        return response.json({
            status: 201,
            message: 'Created Identitas Successfully',
            data: identitas  
        })
    }

    async editIdentitas({request, response, params}) {
        const rules = {
            user_id: 'required|exists:users,id',
            klasifikasi_id : 'required|exists:klasifikasi,id',
            tahun : 'required',
            nomor_urut : 'required',
            deskripsi: 'required'
        }

        // const identitas_req = request.only(['klasifikasi_id', 'tahun', 'nomor_urut'])
        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.json({
                message : validation.messages()
        })
        }

        const identitas = await Identitas.find(params.id)
        identitas.user_id = request.body.user_id
        identitas.klasifikasi_id = request.body.klasifikasi_id
        identitas.tahun = request.body.tahun
        identitas.nomor_urut = request.body.nomor_urut

        const myPicture = request.file('gambar', {
            types: ['image'],
            size: '2mb'
        })

        await myPicture.move(Helpers.publicPath('uploads/identitas'),{
            name: identitas.gambar,
            overwrite: true
        })
        identitas.gambar = new Date().getTime()+'.'+myPicture.subtype

        identitas.deskripsi = request.body.deskripsi        

        await identitas.save();

        return response.json({
            status: 400,
            message: 'Edited Identitas Successfully',
            data: identitas  
        })
    }

    async deleteIdentitas({request, response, params}) {
        const identitas = await Identitas.find(params.id)
        if (!identitas) {
            return response.status(404).json({data: 'Role not found'})
        }
        await identitas.delete()

        return response.json({
            status: 400,
            message: 'Deleted Identitas Successfully',
            data: identitas
        })
    }
}

module.exports = IdentitaController
