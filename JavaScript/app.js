//Variables for scenes, camera, lights, meshes and textures
var scene, camera, renderer, clock, camaraOrtografica, c;
var meshFloor, ambientLight, light;
var floorTexture, floorNormalMap, floorBumpMap;
var skyTexture;
var humanoidAndarFrente = true;
var humanoid2AndarFrente = true;
var humanoid3AndarFrente = true;
var humanoid4AndarFrente = true;
var humanoid5AndarFrente = true;
var humanoid6AndarFrente = true;
var c = 0;
var posicaohumanoid, posicaohumanoid2, posicaohumanoid3, posicaohumanoid4, posicaohumanoid5, posicaohumanoid6, posicaoBala;
var nhumanoidsMortos = 0;
var velocidadehumanoids = 0.03;
var balaColidiu = false;
var loadingText;

//Cena
scene = new THREE.Scene();

//Clock for animations
clock = new THREE.Clock();

//Loading Screen
var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(90, 1600 / 920, 0.1, 1000), //1280/720       (window.innerHeight - 50)/(window.innerHeight - 50)
    box: tree = Arvore(),
    luzLoading: new THREE.AmbientLight(0xFFFFFF, 1)
};

var RESOURCES_LOADED = false;
var loadingManager = null;

//Ecrã de Vitória
// Cria uma nova cena para o ecrã de vitória
var vitoria = new THREE.Scene();

// Cria uma nova câmera para o ecrã de vitória
var cameraVitoria = new THREE.PerspectiveCamera(90, 1690 / 920, 0.1, 1000);

// Carrega uma textura para o ecrã de vitória
var loadTexturaVitoria = new THREE.TextureLoader();
var texturaVitoria = loadTexturaVitoria.load('Textures/Fim.png');
//Obtem as dimensões da imagem

// Cria uma caixa para exibir a textura do ecrã de vitória
var caixaVitoria = new THREE.Mesh(
    new THREE.BoxGeometry(16, 9, 0.1),
    new THREE.MeshBasicMaterial({ map: texturaVitoria })

);

// Cria uma luz ambiente para iluminar o ecrã de vitória
var ambientVitoria = new THREE.AmbientLight(0xFFFFFF, 1);


//humanoids
// Cria uma instância do FBXLoader para importar objetos 3D no formato FBX
var importer = new THREE.FBXLoader();

// Variáveis para controlar a animação e os objetos importados
var mixerAnimacao, objetoImportado;

// Carrega o arquivo Walking.fbx e executa uma função de callback quando o carregamento estiver completo
importer.load('./3D Objects/Walking.fbx', function (object) {
    // Cria uma instância do AnimationMixer e associa-a ao objeto importado
    mixerAnimacao = new THREE.AnimationMixer(object);
    // Obtêm a primeira animação do objeto importado e cria uma ação de animação
    var action = mixerAnimacao.clipAction(object.animations[0]);
    // Inician a reprodução da animação
    action.play();
    // Percorre todos os elementos filho do objeto importado
    object.traverse(function (child) {
        if (child.isMesh) {
            // Habilita o objeto filho para receber e projetar sombras
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    //Adiciona o objeto à cena
    scene.add(object);

    //Configuração da escala e posição do objeto importado
    object.scale.x = 0.0125;
    object.scale.y = 0.0125;
    object.scale.z = 0.0125;
    object.position.set(-15, 0.1, 6);

    //Guarda o objeto importado na variável objetoImportado
    objetoImportado = object;
});

// Repetição do processo para os restantes humanoides
var mixerAnimacao2, humanoidAndar;
importer.load('./3D Objects/Walking.fbx', function (object) {
    mixerAnimacao2 = new THREE.AnimationMixer(object);
    var action = mixerAnimacao2.clipAction(object.animations[0]);
    action.play();
    object.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(object);
    object.scale.x = 0.0125;
    object.scale.y = 0.0125;
    object.scale.z = 0.0125;
    object.position.set(-96, 0.1, 0);
    object.rotation.set(0, -Math.PI / 2, 0);

    humanoidAndar = object;
});

var mixerAnimacao3, humanoid3;
importer.load('./3D Objects/Walking.fbx', function (object) {
    mixerAnimacao3 = new THREE.AnimationMixer(object);
    var action = mixerAnimacao3.clipAction(object.animations[0]);
    action.play();
    object.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(object);
    object.scale.x = 0.0125;
    object.scale.y = 0.0125;
    object.scale.z = 0.0125;
    object.position.set(-62, 0.1, -65);
    object.rotation.set(0, Math.PI / 2, 0);

    humanoid3 = object;
});

var mixerAnimacao4, humanoid4;
importer.load('./3D Objects/Walking.fbx', function (object) {
    mixerAnimacao4 = new THREE.AnimationMixer(object);
    var action = mixerAnimacao4.clipAction(object.animations[0]);
    action.play();
    object.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(object);
    object.scale.x = 0.0125;
    object.scale.y = 0.0125;
    object.scale.z = 0.0125;
    object.position.set(45, 0.1, 54);
    object.rotation.set(0, Math.PI, 0);

    humanoid4 = object;
});

var mixerAnimacao5, humanoid5;
importer.load('./3D Objects/Walking.fbx', function (object) {
    mixerAnimacao5 = new THREE.AnimationMixer(object);
    var action = mixerAnimacao5.clipAction(object.animations[0]);
    action.play();
    object.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(object);
    object.scale.x = 0.0125;
    object.scale.y = 0.0125;
    object.scale.z = 0.0125;
    object.position.set(-69, 0.1, 37);
    object.rotation.set(0, Math.PI, 0);

    humanoid5 = object;
});

var mixerAnimacao6, humanoid6;
importer.load('./3D Objects/Walking.fbx', function (object) {
    mixerAnimacao6 = new THREE.AnimationMixer(object);
    var action = mixerAnimacao6.clipAction(object.animations[0]);
    action.play();
    object.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(object);
    object.scale.x = 0.0125;
    object.scale.y = 0.0125;
    object.scale.z = 0.0125;
    object.position.set(28, 0.1, 78);
    object.rotation.set(0, -Math.PI / 2, 0);

    humanoid6 = object;
});


// Define um objeto chamado "models" que contém informações sobre os modelos 3D a serem carregados
var models = {
    weapon: {
        obj: "3D Objects/blasterL.obj",
        mtl: "Textures/Weapon/blasterL.mtl",
        mesh: null, // Referência ao objeto 3D da arma após ser carregado
        castShadow: false // Indica se a arma deve projetar sombras
    },
    rocketLauncherAmmo: {
        obj: "3D Objects/ammo_rocket.obj",
        mtl: "Textures/RocketLauncher/ammo_rocket.mtl",
        mesh: null
    },
};

// Variável para armazenar os objetos 3D carregados
var meshes = {};

// Lista de balas
var bullets = [];

// Lógica
var keyboard = {}; // Objeto para controlar as teclas pressionadas de movimento
var teclado = {};  // Objeto para controlar as teclas pressionadas das luzes

// Objeto que representa o jogador com propriedades de altura, velocidade, velocidade de rotação e se consegue disparar
var player = { height: 1.8, speed: 0.32, turnSpeed: Math.PI * 0.05, canShoot: 0 }


var USE_WIREFRAME = false; // Indica se deve ser usado o modo de visualização em wireframe

/*---------------ARVORES---------------*/
function Arvore() { // Função para criar uma árvore

    const arvore = new THREE.Group();  // Cria um grupo vazio para representar a árvore

    const folhasLoader = new THREE.TextureLoader(loadingManager); // Criando um loading manager de textura para as folhas da árvore
    var folhasTexture = folhasLoader.load("Textures/Trees/leaves.jpg"); // Carrega a textura das folhas
    const folhas = new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10),// Criando uma geometria esférica para representar as folhas (10 é o nmr de segmentos, quantos mais segmentos, mais detalhe)
        new THREE.MeshLambertMaterial({ map: folhasTexture })// Aplica o material de Lambert com a textura das folhas

    );

    folhas.position.y = 1.4; // Define a posição vertical das folhas em relação à árvore

    const troncoTexturaLoader = new THREE.TextureLoader(loadingManager);// Cria um loadingmanager de textura para o tronco da árvore
    var texturaTronco = troncoTexturaLoader.load("Textures/Trees/base.jpg"); //Carrega a textura do tronco
    const tronco = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.2, 1), // Cria uma geometria cilíndrica para representar o tronco
        new THREE.MeshLambertMaterial({ map: texturaTronco })// Aplica o material de Lambert com a textura do tronco
    );

    folhas.castShadow = true;// Habilita a projeção de sombras para as folhas
    folhas.receiveShadow = false; // Desabilita a receção de sombras para as folhas
    tronco.castShadow = true;// Habilita a projeção de sombras para o tronco
    tronco.receiveShadow = true;// Desabilita a receção de sombras para o tronco

    arvore.add(folhas); //Adiciona as folhas à arvore
    arvore.add(tronco); //Adiciona as folhas ao tronco

    return arvore;
}
/*---------------ARVORES---------------*/
function Banco() {
    const banco = new THREE.Group();
    var loadTexturaBanco = new THREE.TextureLoader(loadingManager);
    var texturaBanco = loadTexturaBanco.load("Textures/Trees/base.jpg");

    //Suporte Esquerdo
    const suporteEsquerdo = new THREE.Group();
    const paralelepipedo1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0xB3B3B3 })
    );
    const paralelepipedo2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0xB3B3B3 })
    );
    const paralelepipedo3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0xB3B3B3 })
    );
    const paralelepipedo4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0xB3B3B3 })
    );
    suporteEsquerdo.add(paralelepipedo1);
    suporteEsquerdo.add(paralelepipedo2);
    suporteEsquerdo.add(paralelepipedo3);
    suporteEsquerdo.add(paralelepipedo4);
    paralelepipedo1.position.set(0, 2, 0);
    paralelepipedo2.position.set(0, 1.6, 0);
    paralelepipedo3.position.set(0, 1.9, 0.5);
    paralelepipedo3.scale.set(1, 1, 1.7);
    paralelepipedo3.rotation.set(Math.PI / 2, 0, 0);
    paralelepipedo4.position.set(0, 1.55, -0.5);
    paralelepipedo4.rotation.set(Math.PI / 2, 0, 0);
    //Suporte Direito
    const suporteDireito = new THREE.Group();
    const paralelepipedo5 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0xB3B3B3 })
    );
    const paralelepipedo6 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0xB3B3B3 })
    );
    const paralelepipedo7 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0xB3B3B3 })
    );
    const paralelepipedo8 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0xB3B3B3 })
    );
    suporteDireito.add(paralelepipedo5);
    suporteDireito.add(paralelepipedo6);
    suporteDireito.add(paralelepipedo7);
    suporteDireito.add(paralelepipedo8);
    paralelepipedo5.position.set(0, 2, 0);
    paralelepipedo6.position.set(0, 1.6, 0);
    paralelepipedo7.position.set(0, 1.9, 0.5);
    paralelepipedo7.scale.set(1, 1, 1.7);
    paralelepipedo7.rotation.set(Math.PI / 2, 0, 0);
    paralelepipedo8.position.set(0, 1.55, -0.5);
    paralelepipedo8.rotation.set(Math.PI / 2, 0, 0);
    suporteDireito.position.set(2, 0, 0);
    //Base
    const base = new THREE.Group();
    const tabua1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ map: texturaBanco })
    );
    const tabua2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ map: texturaBanco })
    );
    const tabua3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ map: texturaBanco })
    );
    base.add(tabua1);
    base.add(tabua2);
    base.add(tabua3);
    tabua1.rotation.set(0, Math.PI / 2, 0);
    tabua1.scale.set(2.1, 0.4, 2.05);
    tabua1.position.set(1, 1.6, 0);
    tabua2.rotation.set(0, Math.PI / 2, 0);
    tabua2.scale.set(2.1, 0.4, 2.05);
    tabua2.position.set(1, 1.6, 0.3);
    tabua3.rotation.set(0, Math.PI / 2, 0);
    tabua3.scale.set(2.1, 0.4, 2.05);
    tabua3.position.set(1, 1.6, -0.3);
    base.position.set(0, 0, 0);
    //Encosto
    const encosto = new THREE.Group();
    const tabua4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ map: texturaBanco })
    );
    const tabua5 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ map: texturaBanco })
    );
    const tabua6 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 1),
        new THREE.MeshPhongMaterial({ map: texturaBanco }) //0x9E5D14
    );
    encosto.add(tabua4);
    encosto.add(tabua5);
    encosto.add(tabua6);
    tabua4.rotation.set(0, Math.PI / 2, 0);
    tabua4.scale.set(2.1, 0.4, 2.05);
    tabua4.position.set(1, 1.6, 0);
    tabua5.rotation.set(0, Math.PI / 2, 0);
    tabua5.scale.set(2.1, 0.4, 2.05);
    tabua5.position.set(1, 1.6, 0.3);
    tabua6.rotation.set(0, Math.PI / 2, 0);
    tabua6.scale.set(2.1, 0.4, 2.05);
    tabua6.position.set(1, 1.6, -0.3);
    encosto.position.set(0, 2.2, -1.1);
    encosto.rotation.set(Math.PI / 2, 0, 0);

    banco.add(suporteEsquerdo);
    banco.add(suporteDireito);
    banco.add(encosto);
    banco.add(base);
    return banco;
}
/*---------------Banco---------------*/
/*---------------Vaso---------------*/
function Vaso() {
    const vaso = new THREE.Group();
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.6, 2),
        new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
    );
    const terra = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.1, 1.8),
        new THREE.MeshPhongMaterial({ color: 0x743B06 })
    );
    terra.position.set(0, 0.27, 0);

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("Textures/flowers.mtl", function (materials) {

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("3D Objects/flowers.obj", function (mesh) {

            mesh.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            vaso.add(mesh);
            mesh.position.set(0, 0.2, 0);
        });
    });

    vaso.add(terra);
    vaso.add(box);
    return vaso;
}
/*---------------Vaso---------------*/

//Sound Effects (SFX)
var listenerSFX = new THREE.AudioListener();
var sfx1 = new THREE.Audio(listenerSFX);

var sfxLoader = new THREE.AudioLoader();
sfxLoader.load('Music/shot.ogg', function (buffer) {
    sfx1.setBuffer(buffer);
    sfx1.setLoop(false);
    sfx1.setVolume(0.5);
});


function Start() {
    //     // var welcomeScreen = document.querySelector("#welcomeScreen");
    //     // var startButton = document.querySelector("#startButton");
    //     // startButton.addEventListener("click", function () {
    //     //     welcomeScreen.style.display = "none";
    //     //     startButton.style.display = "none";
    //     // })
    //     // var welcomeScreen = document.querySelector("#welcomeScreen");
    //     // var startButton = document.querySelector("#startButton");
    //     // var welcomeScreen = document.querySelector("#welcomeScreen");
    //     // var startButton = document.querySelector("#startButton");

    //     // startButton.addEventListener("click", function () {
    //     //     welcomeScreen.style.display = "none";
    //     //     startButton.style.visibility = "hidden";
    //     // });
    //     var welcomeScreen = document.querySelector("#welcomeScreen");
    // var startButton = document.querySelector("#startButton");

    // function hideWelcomeScreen() {
    //   welcomeScreen.style.display = "none";
    //   startButton.style.display = "none";
    // }

    // startButton.addEventListener("click", hideWelcomeScreen, { once: true });



    c = 0; // Variável de controle
    humanoidAndarFrente = true; // Variável de controlo para o movimento do humanoid1
    humanoid2AndarFrente = true; // Variável de controlo para o movimento do humanoid2
    humanoid3AndarFrente = true; // Variável de controlo para o movimento do humanoid3
    humanoid4AndarFrente = true; // Variável de controlo para o movimento do humanoid4
    humanoid5AndarFrente = true; // Variável de controlo para o movimento do humanoid5

    //Skybox
    var skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000); //Geometria para a skybox
    var skyboxMaterials = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Textures/Skybox/front.bmp"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Textures/Skybox/back.bmp"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Textures/Skybox/up.bmp"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Textures/Skybox/bottom.bmp"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Textures/Skybox/right.bmp"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Textures/Skybox/left.bmp"), side: THREE.DoubleSide })
    ];

    var skyboxMaterial = new THREE.MeshFaceMaterial(skyboxMaterials); //Material para a skybox
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial); //Mesh do skybox
    scene.add(skybox); //adiciona a skybox à cena

    // Camera
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.01, 1000); // Criação da câmera perspectiva
    camaraOrtografica = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.1, 1000); // Criação da câmera ortográfica
    camaraOrtografica.position.set(0, 10, 0); // Definindo a posição da câmera ortográfica
    camaraOrtografica.rotation.set(-Math.PI / 2, 0, 0); // Definindo a rotação da câmera ortográfica

    //Loading Screen
    loadingScreen.box.position.set(0, 0, 5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);
    loadingScreen.scene.add(loadingScreen.luzLoading);

    caixaVitoria.position.set(0, 0, 5);
    cameraVitoria.lookAt(caixaVitoria.position);
    vitoria.add(caixaVitoria);
    vitoria.add(ambientVitoria);

    loadingManager = new THREE.LoadingManager(); // Gerenciador de carregamento de recursos
    loadingManager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total); // Função de progresso do carregamento
    }
    loadingManager.onLoad = function () {
        console.log("Loaded all resources"); // Função executada quando todos os recursos são carregados
        RESOURCES_LOADED = true; // Indica que todos os recursos foram carregados
        onResourcesLoaded(); // Função chamada quando todos os recursos são carregados
    }


    // Chao
    // Carrega a textura do chão
    var textLoadFloor = new THREE.TextureLoader(loadingManager);
    floorTexture = textLoadFloor.load("Textures/Floor/grass2.png");
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);
    // Cria um objeto Mesh para representar o chão
    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500, 10, 10), // Cria uma geometria plana para o chão
        new THREE.MeshPhongMaterial({ // Aplica um material de Phong ao chão
            color: 0xffffff, // Cor branca
            map: floorTexture, // Textura do chão
        })
    );
    meshFloor.rotation.x += (3 * Math.PI) / 2; // Gira o chão em 270 graus (para posicionar horizontalmente)
    meshFloor.receiveShadow = true; // Permite que o chão receba sombras
    scene.add(meshFloor); // Adiciona o chão à cena

    // //Music
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader(loadingManager);
    audioLoader.load('Music/michael.ogg', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
    // Luzes
    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);// Cria uma luz ambiente com cor branca e intensidade 0.3
    scene.add(ambientLight); // Adiciona a luz ambiente à cena

    // Cria uma luz direcional com cor branca e intensidade 0.5
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.castShadow = true; // Permite que a luz direcional projete sombras
    scene.add(directionalLight); // Adiciona a luz direcional à cena
    // // Criação das PointLights para os humanoide

    // Cria uma luz pontual com cor branca, intensidade 2 e posição específica
    light = new THREE.PointLight(0xffffff, 2, 18);
    // light.position.set(6, 5, -3); // Define a posição da luz pontual
    light.position.set(-96, 0.1, 0);
    light.castShadow = true; // Permite que a luz pontual projete sombras
    light.shadow.camera.near = 0.1; // Configura o plano de corte próximo da sombra
    light.shadow.camera.far = 25; // Configura o plano de corte distante da sombra
    scene.add(light); // Adiciona a luz pontual à cena

    // Cria outra luz pontual com cor castanha, intensidade 3 e posição específica
    luzPoint = new THREE.PointLight(0x964B00, 2, 18);
    luzPoint.position.set(-62, 0.1, -65); 
    luzPoint.castShadow = true; 
    luzPoint.shadow.camera.near = 0.1;
    luzPoint.shadow.camera.far = 25; 
    scene.add(luzPoint); 

    luzPoint2 = new THREE.PointLight(0x0000FF, 2, 18); //azul
    luzPoint2.position.set(-15, 0.1, 6); 
    luzPoint2.castShadow = true; 
    luzPoint2.shadow.camera.near = 0.1;
    luzPoint2.shadow.camera.far = 25; 
    scene.add(luzPoint2); 

    luzPoint3 = new THREE.PointLight(0xFF0000, 2, 18); //vermelho
    luzPoint3.position.set(45, 0.1, 54); 
    luzPoint3.castShadow = true; 
    luzPoint3.shadow.camera.near = 0.1;
    luzPoint3.shadow.camera.far = 25; 
    scene.add(luzPoint3); 

    
    luzPoint4 = new THREE.PointLight(0x8A2BE2, 2, 18); //violeta
    luzPoint4.position.set(-69, 0.1, 37); 
    luzPoint4.castShadow = true; 
    luzPoint4.shadow.camera.near = 0.1;
    luzPoint4.shadow.camera.far = 25; 
    scene.add(luzPoint4); 

    
    luzPoint5 = new THREE.PointLight(0xFFA500, 2, 18); //laranja
    luzPoint5.position.set(28, 0.1, 78); 
    luzPoint5.castShadow = true; 
    luzPoint5.shadow.camera.near = 0.1;
    luzPoint5.shadow.camera.far = 25; 
    scene.add(luzPoint5); 


    //Carrega vários modelos
    for (var _key in models) {
        (function (key) {
            var mtlLoader = new THREE.MTLLoader(loadingManager); //Cria um loadingManager de material de texturas mtl
            mtlLoader.load(models[key].mtl, function (materials) { // Carrega o arquivo MTL correspondente ao modelo
                materials.preload(); // Preload dos materiais

                var objLoader = new THREE.OBJLoader(loadingManager); // Cria um LoadingManager de objeto OBJ
                objLoader.setMaterials(materials); // Define os materiais carregados para o objLoader de objeto

                objLoader.load(models[key].obj, function (mesh) { // Carrega o arquivo OBJ correspondente ao modelo
                    mesh.traverse(function (node) {
                        if (node instanceof THREE.Mesh) {
                            if ('castShadow' in models[key])
                                node.castShadow = models[key].castShadow;
                            else
                                node.castShadow = true;

                            if ('receiveShadow' in models[key])
                                node.receiveShadow = models[key].receiveShadow;
                            else
                                node.receiveShadow = true;
                        }
                    });

                    models[key].mesh = mesh; // Armazena o objeto 3D do modelo na propriedade "mesh" do objeto "models"
                });
            });
        })(_key);

    }
    //Arvores
    var i, randX, randZ;
    for (i = 0; i < 7; i++) {// Gerando coordenadas aleatórias para a posição das árvores
        randX = THREE.Math.randInt(-12, -22);
        randZ = THREE.Math.randInt(37, 44);

        novaArvore = Arvore();// Cria uma nova instância da árvore e adiciona-a à cena
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0.3, randZ);
    }
    for (var i = 0; i < 20; i++) {
        randX = THREE.Math.randInt(-7, -57);
        randZ = THREE.Math.randInt(-7, -57);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0.3, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }
    for (var i = 0; i < 20/*50*/; i++) {
        randX = THREE.Math.randInt(70, 250);
        randZ = THREE.Math.randInt(-250, 250);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }
    for (var i = 0; i < 20/*50*/; i++) {
        randX = THREE.Math.randInt(-70, -250);
        randZ = THREE.Math.randInt(-250, 250);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }
    for (var i = 0; i < 10; i++) {
        randX = THREE.Math.randInt(-70, 70);
        randZ = THREE.Math.randInt(-70, -250);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }
    for (var i = 0; i < 10; i++) {
        randX = THREE.Math.randInt(-70, 70);
        randZ = THREE.Math.randInt(70, 250);

        novaArvore = Arvore();
        scene.add(novaArvore);
        novaArvore.position.set(randX, 0, randZ);
        novaArvore.scale.set(2.8, 2.8, 2.8);
    }

    // Bancos
    var banco = Banco();
    scene.add(banco);
    banco.position.set(-52, -1, 16);
    banco.scale.set(1, 1, 1);
    banco.rotation.y = Math.PI;

    var banco = Banco();
    scene.add(banco);
    banco.position.set(-50, -1, 16);
    banco.scale.set(1, 1, 1);
    banco.rotation.y = Math.PI;

    var banco = Banco();
    scene.add(banco);
    banco.position.set(-48, -1, 16);
    banco.scale.set(1, 1, 1);
    banco.rotation.y = Math.PI;


    var banco = Banco();
    scene.add(banco);
    banco.position.set(-46, -1, 16);
    banco.scale.set(1, 1, 1);
    banco.rotation.y = Math.PI;

    var banco = Banco();
    scene.add(banco);
    banco.position.set(-44, -1, 16);
    banco.scale.set(1, 1, 1);
    banco.rotation.y = Math.PI;

    // bancos do outro lado
    var banco = Banco();
    scene.add(banco);
    banco.position.set(-52, -1, 36);
    banco.scale.set(1, 1, 1);


    var banco = Banco();
    scene.add(banco);
    banco.position.set(-50, -1, 36);
    banco.scale.set(1, 1, 1);

    var banco = Banco();
    scene.add(banco);
    banco.position.set(-48, -1, 36);
    banco.scale.set(1, 1, 1);


    var banco = Banco();
    scene.add(banco);
    banco.position.set(-46, -1, 36);
    banco.scale.set(1, 1, 1);


    var banco = Banco();
    scene.add(banco);
    banco.position.set(-44, -1, 36);
    banco.scale.set(1, 1, 1);


    // Vasos
    var vaso = new Vaso();
    scene.add(vaso);
    vaso.position.set(-52.5, 0.2, 26);
    vaso.scale.set(1.5, 1.75, 1);
    vaso.rotation.set(0, Math.PI / 2, 0);

    var vaso = new Vaso();
    scene.add(vaso);
    vaso.position.set(-49.5, 0.2, 26);
    vaso.scale.set(1.5, 1.75, 1);
    vaso.rotation.set(0, Math.PI / 2, 0);

    var vaso = new Vaso();
    scene.add(vaso);
    vaso.position.set(-46.5, 0.2, 26);
    vaso.scale.set(1.5, 1.75, 1);
    vaso.rotation.set(0, Math.PI / 2, 0);
    
    var vaso = new Vaso();
    scene.add(vaso);
    vaso.position.set(-43.5, 0.2, 26);
    vaso.scale.set(1.5, 1.75, 1);
    vaso.rotation.set(0, Math.PI / 2, 0);


    //Cameras
    camera.position.set(0, player.height, -5); // Define a posição da câmera
    camera.lookAt(new THREE.Vector3(0, player.height, 0));// Define o ponto para o qual a câmera está posicionada

    //Renderer
    renderer = new THREE.WebGLRenderer();// Cria um novo render WebGL
    renderer.setSize(1280, 720); // Define o tamanho da área de renderização
    renderer.shadowMap.enabled = true;// Ativa o mapeamento de sombras
    renderer.shadowMap.type = THREE.BasicShadowMap;// Define o tipo de mapeamento de sombras como BasicShadowMap

    //Controls
    // Cria controlos para a câmera usando o PointerLockControls
    controls = new THREE.PointerLockControls(camera, renderer.domElement);
    // Adiciona o elemento do renderizador ao corpo do documento HTML
    document.body.appendChild(renderer.domElement);
    Update();// Inicia a função de atualização do jogo
}

//MouseClick event
var isClicked = 0;
document.addEventListener('mousedown', ev => {
    if (player.canShoot <= 0) {
        isClicked = 1;
    }

    controls.lock();
});

//Corre quando todos os recursos forem carregados
function onResourcesLoaded() {

    //Arma do jogador
    meshes["weapon"] = models.weapon.mesh.clone();
    meshes["weapon"].position.set(0, 0.1, 0);
    meshes["weapon"].scale.set(1, 1, 1);
    scene.add(meshes["weapon"]);

}

function Update() {
    /*---------------Loading Screen---------------*/
    if (RESOURCES_LOADED == false) {
        requestAnimationFrame(Update);

        loadingScreen.box.rotation.y += 0.05;
        loadingScreen.box.scale.set(0.8, 0.8, 0.8);
        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
    }
    /*--------------------------------------------*/
    requestAnimationFrame(Update);

    // Configurações de tempo para animações
    var time = Date.now() * 0.0005;
    var delta = clock.getDelta();

    //Movimentação humanoids
    //humanoid 1
    if (humanoidAndarFrente == true) {// Verifica se o humanoid está a andar para a frente
        if (objetoImportado.position.z > 59) { // Verifica se a posição z do objetoImportado é maior que 59
            humanoidAndarFrente = false;// Caso seja maior, indica que o humanoid deve começar a andar para trás
            objetoImportado.rotation.set(0, Math.PI, 0); // Define a rotação do objetoImportado para que ele fique de costas
        } else {
            // Caso contrário, incrementa a posição z do objetoImportado pela velocidade dos humanoids
            objetoImportado.position.z += velocidadehumanoids;
        }
    }
    if (humanoidAndarFrente == false) {
        if (objetoImportado.position.z < 5) {
            objetoImportado.rotation.set(0, 2 * Math.PI, 0);
            humanoidAndarFrente = true;
        } else {
            objetoImportado.position.z -= velocidadehumanoids;
        }
    }
  
    //humanoid 2
    if (humanoid2AndarFrente == true) {
        if (humanoidAndar.position.x < -59) {
            humanoid2AndarFrente = false;
            humanoidAndar.rotation.set(0, Math.PI / 2, 0);
        } else {
            humanoidAndar.position.x -= velocidadehumanoids;
        }
    }
    if (humanoid2AndarFrente == false) {
        if (humanoidAndar.position.x > -5) {
            humanoidAndar.rotation.set(0, -Math.PI / 2, 0);
            humanoid2AndarFrente = true;
        } else {
            humanoidAndar.position.x += velocidadehumanoids;
        }
    }
    //humanoid 3
    if (humanoid3AndarFrente == true) {
        if (humanoid3.position.x > 60) {
            humanoid3AndarFrente = false;
            humanoid3.rotation.set(0, -Math.PI / 2, 0);
        } else {
            humanoid3.position.x += velocidadehumanoids;
        }
    }
    if (humanoid3AndarFrente == false) {
        if (humanoid3.position.x < -63) {
            humanoid3.rotation.set(0, Math.PI / 2, 0);
            humanoid3AndarFrente = true;
        } else {
            humanoid3.position.x -= velocidadehumanoids;
        }
    }
    //humanoid 4
    if (humanoid4AndarFrente == true) {
        if (humanoid4.position.z < -59) {
            humanoid4AndarFrente = false;
            humanoid4.rotation.set(0, 2 * Math.PI, 0);
        } else {
            humanoid4.position.z -= velocidadehumanoids;
        }
    }
    if (humanoid4AndarFrente == false) {
        if (humanoid4.position.z > 1) {
            humanoid4.rotation.set(0, Math.PI, 0);
            humanoid4AndarFrente = true;
        } else {
            humanoid4.position.z += velocidadehumanoids;
        }
    }
    //humanoid 5
    if (humanoid5AndarFrente == true) {
        if (humanoid5.position.z < -59) {
            humanoid5AndarFrente = false;
            humanoid5.rotation.set(0, 2 * Math.PI, 0);
        } else {
            humanoid5.position.z -= velocidadehumanoids;
        }
    }
    if (humanoid5AndarFrente == false) {
        if (humanoid5.position.z > 36) {
            humanoid5.rotation.set(0, Math.PI, 0);
            humanoid5AndarFrente = true;
        } else {
            humanoid5.position.z += velocidadehumanoids;
        }
    }
    //humanoid 6
    if (humanoid6AndarFrente == true) {
        if (humanoid6.position.x < -36) {
            humanoid6AndarFrente = false;
            humanoid6.rotation.set(0, Math.PI / 2, 0);
        } else {
            humanoid6.position.x -= velocidadehumanoids;
        }
    }
    if (humanoid6AndarFrente == false) {
        if (humanoid6.position.x > 18) {
            humanoid6.rotation.set(0, -Math.PI / 2, 0);
            humanoid6AndarFrente = true;
        } else {
            humanoid6.position.x += velocidadehumanoids;
        }
    }

    //MixerAnimacao
    // Atualizações dos mixers de animação
    // Verifica se o mixerAnimacao existe e atualiza-o com o valor de delta
    if (mixerAnimacao) {
        mixerAnimacao.update(delta);
    }
    if (mixerAnimacao2) {
        mixerAnimacao2.update(delta);
    }
    if (mixerAnimacao3) {
        mixerAnimacao3.update(delta);
    }
    if (mixerAnimacao4) {
        mixerAnimacao4.update(delta);
    }
    if (mixerAnimacao5) {
        mixerAnimacao5.update(delta);
    }
    if (mixerAnimacao6) {
        mixerAnimacao6.update(delta);
    }

    //Adiciona velocidade às balas
    for (var index = 0; index < bullets.length; index += 1) {
        if (bullets[index] === undefined) continue;
        if (bullets[index].alive == false) {
            bullets.splice(index, 1);
            continue;
        }
        bullets[index].position.add(bullets[index].velocity)
    }

    //Movimento
    if (keyboard[87]) { //W
        controls.moveForward(player.speed);
    }
    if (keyboard[83]) { //S
        controls.moveForward(-player.speed);
    }
    if (keyboard[65]) { //A
        controls.moveRight(-player.speed);
    }
    if (keyboard[68]) { //D
        controls.moveRight(player.speed);
    }
    if (keyboard[16] && keyboard[87]) { //Shift + W (Correr)
        controls.moveForward(player.speed * 2); // o 2 define a velocidade x2
    }

    //MouseClick
    if (isClicked == 1 && player.canShoot <= 0) {

        //Play sfx
        sfx1.play();

        var bullet = models.rocketLauncherAmmo.mesh.clone();
        bullet.rotation.set(
            meshes["weapon"].rotation.z,
            meshes["weapon"].rotation.y,
            meshes["weapon"].rotation.x
        );

        bullet.scale.set(10, 10, 10);

        bullet.position.set(
            meshes["weapon"].position.x,
            meshes["weapon"].position.y,
            meshes["weapon"].position.z
        );
        //bullet.position.copy(meshes["weapon"].getWorldPosition());
        //bullet.quaternion.copy(camera.quaternion);

        bullet.velocity = new THREE.Vector3(
            -Math.sin(camera.rotation.y),
            0,
            Math.cos(camera.rotation.y)
        );
        bullet.alive = true;
        setTimeout(
            function () {
                bullet.alive = false;
                scene.remove(bullet);
            },
            1000
        );
        bullets.push(bullet);
        scene.add(bullet);
        if (bullet)
            posicaoBala = bullet.position;
        player.canShoot = 80;

        //Reset click
        isClicked = 0;
    }
    if (player.canShoot > -1)
        player.canShoot -= 1;

    //Update weapon position in relation to camera
    meshes["weapon"].position.set(
        // camera.position.x - Math.sin(camera.rotation.y + Math.PI/6) * 0.3,
        // camera.position.y - 0.3 + Math.sin(time * 2 + camera.position.x + camera.position.z) * 0.01,
        // camera.position.z + Math.cos(camera.rotation.y + Math.PI/6) * 0.3
        camera.position.x,
        camera.position.y - 0.2,
        camera.position.z + 0.15
    );


    meshes["weapon"].rotation.set(
        camera.rotation.x,
        camera.rotation.y,
        camera.rotation.z
    );

    //"Colision Detection"
    posicaohumanoid = humanoidAndar.position;
    posicaohumanoid2 = objetoImportado.position;
    posicaohumanoid3 = humanoid3.position;
    posicaohumanoid4 = humanoid4.position;
    posicaohumanoid5 = humanoid5.position;
    posicaohumanoid6 = humanoid6.position;
    if (posicaoBala) {
        if (posicaoBala.distanceTo(posicaohumanoid) < 2) {
            if (humanoidAndar.parent === scene)
                nhumanoidsMortos++;
            // balaColidiu = true;
            // document.dispatchEvent(new Event('pontuar'));
            pontuacao += 100;
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontuacao;
            scene.remove(humanoidAndar);
            scene.remove(bullet);
        }
        if (posicaoBala.distanceTo(posicaohumanoid2) < 2) {
            if (objetoImportado.parent === scene)
                nhumanoidsMortos++;
            // balaColidiu = true;
            // document.dispatchEvent(new Event('pontuar'));
            pontuacao += 100;
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontuacao;
            scene.remove(objetoImportado);
            scene.remove(bullet);
        }
        if (posicaoBala.distanceTo(posicaohumanoid3) < 2) {
            if (humanoid3.parent === scene)
                nhumanoidsMortos++;
            // balaColidiu = true;
            // document.dispatchEvent(new Event('pontuar'));
            pontuacao += 100;
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontuacao;
            scene.remove(humanoid3);
            scene.remove(bullet);
        }
        if (posicaoBala.distanceTo(posicaohumanoid4) < 2) {
            if (humanoid4.parent === scene)
                nhumanoidsMortos++;
            // balaColidiu = true;
            // document.dispatchEvent(new Event('pontuar'));
            pontuacao += 100;
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontuacao;
            scene.remove(humanoid4);
            scene.remove(bullet);
        }
        if (posicaoBala.distanceTo(posicaohumanoid5) < 2) {
            if (humanoid5.parent === scene)
                nhumanoidsMortos++;
            // balaColidiu = true;
            // document.dispatchEvent(new Event('pontuar'));
            pontuacao += 100;
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontuacao;
            scene.remove(humanoid5);
            scene.remove(bullet);
        }
        if (posicaoBala.distanceTo(posicaohumanoid6) < 2) {
            if (humanoid6.parent === scene)
                nhumanoidsMortos++;
            // balaColidiu = true;
            // document.dispatchEvent(new Event('pontuar'));
            pontuacao += 100;
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pontuacao;
            scene.remove(humanoid6);
            scene.remove(bullet);
        }
    }

    if (nhumanoidsMortos == 6) {
        fimDoJogo();
    }

    //Change Cameras
    
        if (c == 0)
            renderer.render(scene, camera);
        else if (c == 1)
            renderer.render(scene, camaraOrtografica);
        else if (c == 2)
            renderer.render(vitoria, cameraVitoria);
        }

function keyDown(event) {
    keyboard[event.keyCode] = true;
}
function keyUp(event) {
    keyboard[event.keyCode] = false;
}
function abrirMinimapa(evento) {
    teclado[evento.keyCode] = true;
    //Minimapa/Alternar Câmara
    if (teclado[77]) { //M
        if (c == 0)
            c++;
        else
            c--;
    }

    //Disparar Alternativo
    if (teclado[70]) { //F
        if (player.canShoot <= 0) {
            isClicked = 1;
        }
    }
    if (teclado[80]) { //P (Point Lights)
        if (light.visible == true) {
            light.visible = false;
            luzPoint.visible = false;
            luzPoint2.visible = false;
            luzPoint3.visible = false;
            luzPoint4.visible = false;
            luzPoint5.visible = false;
        }
        else {
            light.visible = true;
            luzPoint.visible = true;
            luzPoint2.visible = true;
            luzPoint3.visible = true;
            luzPoint4.visible = true;
            luzPoint5.visible = true;
        }
    }
    if (teclado[76]) { //L (Ambient Light)
        if (ambientLight.visible == true)
            ambientLight.visible = false;
        else
            ambientLight.visible = true;
    }
    if (teclado[79]) { //O (Directional Light)
        if (directionalLight.visible == true)
            directionalLight.visible = false;
        else
            directionalLight.visible = true;
    }
    teclado[evento.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
window.addEventListener('keyup', abrirMinimapa);

function fimDoJogo() {
    c = 2;
}

window.onload = Start;