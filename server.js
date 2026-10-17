const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data.json');
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const initialData = {
  communities: [
    {id:1,name:'PyLadies Manaus',category:'Programação',description:'Grupo que incentiva e apoia mulheres na programação, com encontros, formações e projetos.',city:'Manaus - AM',members:120,image:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85',tags:['Python','Comunidade','Iniciantes']},
    {id:2,name:'Manas Digitais',category:'Inclusão digital',description:'Iniciativa que capacita mulheres da periferia em tecnologia e promove oportunidades no mercado de trabalho.',city:'Manaus - AM',members:85,image:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85',tags:['Inclusão digital','Empreendedorismo']},
    {id:3,name:'Amazonas Tech Girls',category:'Educação em tecnologia',description:'Projeto de incentivo para meninas e mulheres aprenderem tecnologia com oficinas e projetos.',city:'Manaus - AM',members:130,image:'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85',tags:['Jovens','Educação']},
    {id:4,name:'Manas Devs',category:'Desenvolvimento Web',description:'Comunidade colaborativa de desenvolvedoras do Amazonas para aprender, compartilhar e crescer juntas.',city:'Manaus - AM',members:90,image:'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=85',tags:['Desenvolvimento Web','Mentoria']}
  ],
  professionals: [
    {id:1,name:'Juliana Souza',role:'Desenvolvedora Front-end',city:'Manaus - AM',area:'Tecnologia',image:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=85',bio:'Compartilha experiências de carreira e desenvolvimento web.'},
    {id:2,name:'Camila Ribeiro',role:'Cientista de Dados',city:'Manaus - AM',area:'Dados',image:'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=85',bio:'Ajuda iniciantes a explorar dados, Python e inteligência artificial.'},
    {id:3,name:'Fernanda Lima',role:'UX/UI Designer',city:'Parintins - AM',area:'Design',image:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85',bio:'Acredita em produtos digitais acessíveis e centrados nas pessoas.'},
    {id:4,name:'Larissa Monteiro',role:'Analista de Segurança',city:'Manaus - AM',area:'Cibersegurança',image:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=85',bio:'Fala sobre segurança digital e caminhos de entrada na área.'}
  ],
  events: [
    {id:1,day:'15',month:'MAR',title:'Workshop: Primeiros Passos no Python',type:'Presencial',city:'Manaus - AM',description:'Uma manhã de programação na prática, com atividades colaborativas.',tag:'Iniciantes'},
    {id:2,day:'22',month:'MAR',title:'Roda de Conversa: Mulheres na Liderança',type:'Online',city:'Online',description:'Conversa sobre carreira, liderança e redes de apoio.',tag:'Carreira'},
    {id:3,day:'05',month:'ABR',title:'Hackathon: Soluções para a Amazônia',type:'Híbrido',city:'Manaus - AM',description:'Crie soluções tecnológicas para desafios reais da região.',tag:'Inovação'}
  ],
  posts: [],
  registrations: []
};
function loadData(){try { if(fs.existsSync(DATA_FILE)) return {...initialData,...JSON.parse(fs.readFileSync(DATA_FILE,'utf8'))}; } catch(e){console.error('Falha ao ler data.json:',e.message)} return structuredClone(initialData);}
let db = loadData();
function save(){try{fs.writeFileSync(DATA_FILE,JSON.stringify(db,null,2));}catch(e){console.error('Não foi possível salvar os dados:',e.message)}}
app.get('/api/health',(req,res)=>res.json({ok:true,service:'Amazonas Tech Mulheres API',version:'1.0.0'}));
app.get('/api',(req,res)=>res.json({name:'Amazonas Tech Mulheres API',endpoints:['/api/health','/api/communities','/api/professionals','/api/events','/api/posts']}));
app.get('/api/communities',(req,res)=>{const q=(req.query.q||'').toLowerCase();res.json(db.communities.filter(x=>`${x.name} ${x.category} ${x.description} ${x.city} ${x.tags.join(' ')}`.toLowerCase().includes(q)));});
app.get('/api/communities/:id',(req,res)=>{const item=db.communities.find(x=>x.id===Number(req.params.id));item?res.json(item):res.status(404).json({error:'Comunidade não encontrada'});});
app.get('/api/professionals',(req,res)=>{const q=(req.query.q||'').toLowerCase();res.json(db.professionals.filter(x=>`${x.name} ${x.role} ${x.area} ${x.city}`.toLowerCase().includes(q)));});
app.get('/api/events',(req,res)=>res.json(db.events));
app.get('/api/posts',(req,res)=>res.json([...db.posts].reverse()));
app.post('/api/posts',(req,res)=>{const {name,content}=req.body||{};if(!name||!content||!String(content).trim())return res.status(400).json({error:'Informe seu nome e o conteúdo da publicação.'});const post={id:Date.now(),name:String(name).trim().slice(0,80),content:String(content).trim().slice(0,1200),createdAt:new Date().toISOString(),likes:0};db.posts.push(post);save();res.status(201).json(post);});
app.post('/api/posts/:id/like',(req,res)=>{const post=db.posts.find(x=>x.id===Number(req.params.id));if(!post)return res.status(404).json({error:'Publicação não encontrada'});post.likes++;save();res.json(post);});
app.post('/api/registrations',(req,res)=>{const {name,email,interest}=req.body||{};if(!name||!email)return res.status(400).json({error:'Nome e e-mail são obrigatórios.'});const item={id:Date.now(),name:String(name).trim(),email:String(email).trim(),interest:String(interest||'Comunidade'),createdAt:new Date().toISOString()};db.registrations.push(item);save();res.status(201).json({message:'Cadastro recebido! Seja bem-vinda à comunidade.',registration:{id:item.id,name:item.name,interest:item.interest}});});
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,'0.0.0.0',()=>console.log(`Amazonas Tech Mulheres rodando na porta ${PORT}`));
