let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app");


chai.should();

chai.use(chaiHttp);



describe('Prueba Unitaria API TODO LIST', () =>{
    var user = {
        username:'yerkobanda',
        password:'123456',
        nombre: 'Yerko Banda'
    }
    var token = "";

    //Test a INSCRIBIR USUARIO
    describe('Test /users/inscribir', () => {
        it('Test inscribir POST', (done) => {
        chai.request(server)
            .post('/users/inscribir')
            .send(user)
            .end( (error,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('ok');
                response.body.should.have.property('error');
                response.body.should.have.property('respuesta');
                response.body.respuesta.should.have.property('id_usuario');
                response.body.respuesta.should.have.property('username');
                response.body.respuesta.should.have.property('nombre');
                response.body.respuesta.id_usuario.should.be.eq(3);
                done();
            });  
        });       
    });
    describe('Test /users/inscribir', () => {
        it('Test inscribir GET', (done) => {
        chai.request(server)
            .get('/users/inscribir')
            .end( (error,response)=>{
                response.should.have.status(401);
                done();
            });  
        });       
    });
    //END Test a INSCRIBIR USUARIO

    //Test a Login POST
    describe('Test /users/login', () => {
        it('Test Login POST', (done) => {
        chai.request(server)
            .post('/users/login')
            .send(user)
            .end( (error,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('ok');
                response.body.should.have.property('error');
                response.body.should.have.property('respuesta');
                response.body.respuesta.should.have.property('token');
                response.body.respuesta.should.have.property('username');
                response.body.respuesta.should.have.property('nombre');
                token = response.body.respuesta.token;
                done();
            });  
        });       
    });
    //END Test a Login POST

    //Test a getTareasByUser
    describe('Test /tareas/getTareasByUser', () => {
        it('Test getTareasByUser GET', (done) => {
        chai.request(server)
            .get('/tareas/getTareasByUser/'+1)
            .set('authorization', token)
            .end( (error,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('ok');
                response.body.should.have.property('error');
                response.body.should.have.property('respuesta');
                response.body.respuesta.length.should.be.eq(2);
                done();
            });  
        });       
    });
    //END Test a getTareasByUser

    //Test a marcar tarea resuelta
    describe('Test tareas/marcarResueltaTarea/', () => {
        it('Test getTareasByUser GET', (done) => {
        chai.request(server)
            .put('/tareas/marcarResueltaTarea/'+1)
            .set('authorization', token)
            .end( (error,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('ok');
                response.body.should.have.property('error');
                response.body.should.have.property('respuesta');
                response.body.respuesta.estado.should.be.eq("Resuelto");
                done();
            });  
        });       
    });
    //END Test a marcar tarea resuelta
});