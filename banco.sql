create database situacaoaprendizagem;

use situacaoaprendizagem;

create table usuario (
	id int not null auto_increment,
    avatar varchar(20),
    nome varchar(100) not null,
    cpf varchar(14) not null unique,
    dt_nascimento date,
    sexo int,
    email varchar(100) not null unique,
    senha varchar(250) not null,
    situacao int default 1,
    funcao int not null,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp,
    primary key (id)
);

create table sala (
	id int not null auto_increment,
    numero int not null,
    bloco int not null,
    apelido varchar(100) not null,
    descricao_tipo varchar(200),
    capacidade int,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp,
    primary key (id)
);

create table turma (
	id int not null auto_increment,
    apelido varchar(100) not null,
    nome_curso varchar(150),
    ano_inicio date,
    duracao int,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp,
    primary key (id)
);

create table reserva (
	id int not null auto_increment,
    justificativa varchar(150),
    dt_reserva datetime default current_timestamp,
    periodo varchar(20) not null,
    id_usuario int not null,
    id_sala int not null,
    id_turma int not null,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp,
    primary key (id),
    constraint fk_reserva_professor foreign key (id_usuario) references usuario(id),
    constraint fk_reserva_sala foreign key (id_sala) references sala(id),
    constraint fk_reserva_turma foreign key (id_turma) references turma(id)
);

delimiter $$
create procedure InsereUsuario(
    p_avatar varchar(20),
	p_nome varchar(100),
    p_cpf varchar(14),
    p_dt_nascimento date,
    p_sexo int,
    p_email varchar(100),
    p_senha varchar(250),
    p_funcao int
)
begin
	insert into usuario (
		`avatar`, `nome`, `cpf`, `dt_nascimento`, `sexo`, `email`, `senha`, `funcao`
    ) values (
		p_avatar, p_nome, p_cpf, p_dt_nascimento, p_sexo, p_email, p_senha, p_funcao
    );
end$$
delimiter ;

delimiter $$
create procedure InsereSala(
    p_numero int,
    p_bloco int,
    p_apelido varchar(100),
    p_descricao_tipo varchar(200),
    p_capacidade int
)
begin
    insert into sala (
        `numero`, `bloco`, `apelido`, `descricao_tipo`, `capacidade`
    ) values (
        p_numero, p_bloco, p_apelido, p_descricao_tipo, p_capacidade
    );
end$$
delimiter ;

delimiter $$
create procedure InsereTurma (
    p_apelido varchar(100),
    p_nome_curso varchar(150),
    p_ano_inicio date,
    p_duracao int
)
begin
    insert into turma (
        `apelido`, `nome_curso`, `ano_inicio`, `duracao`
    ) values (
        p_apelido, p_nome_curso, p_ano_inicio, p_duracao
    );
end$$
delimiter ;

delimiter $$
create procedure InsereReserva(
    p_justificativa varchar(150),
    p_dt_reserva datetime,
    p_periodo varchar(20),
    p_id_usuario int,
    p_id_sala int,
    p_id_turma int
)
begin
    insert into reserva (
        `justificativa`, `dt_reserva`, `periodo`, `id_usuario`, `id_sala`, `id_turma`
    ) values (
        p_justificativa, p_dt_reserva, p_periodo, p_id_usuario, p_id_sala, p_id_turma
    );
end$$
delimiter ;

delimiter $$
create procedure EditarUsuario (
    p_id int,
	p_nome varchar(100),
    p_cpf varchar(14),
    p_dt_nascimento date,
    p_sexo int,
    p_email varchar(100),
    p_situacao int,
    p_funcao int
)
begin
	update usuario set 
        `nome` = p_nome,
		`cpf` = p_cpf,
        `dt_nascimento` = p_dt_nascimento,
        `sexo` = p_sexo,
        `email` = p_email,
        `situacao` = p_situacao,
        `funcao` = p_funcao,
        `updatedAt` = current_timestamp
    where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure EditarSala(
    p_id int,
    p_numero int,
    p_bloco int,
    p_apelido varchar(100),
    p_descricao_tipo varchar(200),
    p_capacidade int
)
begin
    update sala set
        `numero` = p_numero,
        `bloco` = p_bloco,
        `apelido` = p_apelido,
        `descricao_tipo` = p_descricao_tipo,
        `capacidade` = p_capacidade,
        `updatedAt` = current_timestamp
    where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure EditarTurma(
    p_id int,
    p_apelido varchar(100),
    p_nome_curso varchar(150),
    p_ano_inicio date,
    p_duracao int
)
begin
    update turma set
        `apelido` = p_apelido,
        `nome_curso` = p_nome_curso,
        `ano_inicio` = p_ano_inicio,
        `duracao` = p_duracao,
        `updatedAt` = current_timestamp
    where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure EditarReserva(
    p_id int,
    p_justificativa varchar(150),
    p_dt_reserva datetime,
    p_periodo varchar(20),
    p_id_usuario int,
    p_id_sala int,
    p_id_turma int
)
begin
    update reserva set
        `justificativa` = p_justificativa,
        `dt_reserva` = p_dt_reserva,
        `periodo` = p_periodo,
        `id_usuario` = p_id_usuario,
        `id_sala` = p_id_sala,
        `id_turma` = p_id_turma,
        `updatedAt` = current_timestamp
    where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure DeletarUsuario(
    p_id int
)
begin
    delete from usuario where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure DeletarTurma(
    p_id int
)
begin
    delete from turma where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure DeletarSala(
    p_id int
)
begin
    delete from sala where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure DeletarReserva(
    p_id int
)
begin
    delete from reserva where `id` = p_id;
end$$
delimiter ;

create view RelatorioTurmas as
    select * from turma;

create view RelatorioSalas as
    select * from sala;

create view RelatorioUsuarios as
select * from usuario;

create view RelatorioReservas as
    select
        usuario.avatar as avatar,
        usuario.nome as professor,
        sala.apelido as numero_sala,
        sala.descricao_tipo as descricao_sala,
        reserva.periodo as periodo,
        turma.apelido as turma,
        reserva.createdAt as criada_em,
        reserva.updatedAt as atualizada_em
    from reserva
        inner join usuario on usuario.id = reserva.id_usuario
        inner join sala on sala.id = reserva.id_sala
        inner join turma on turma.id = reserva.id_turma;

call InsereUsuario(
    'default.jpg',
    'Administrator',
    '000.000.000-12',
    '2000-01-01',
    1,
    'administrator@system.com',
    '$2a$15$BuFL/wiGSzMYWGVVbWoFOO7HWWawAOjAECxO79JK8SAUB8ybEKMHi',
    1
);

call InsereUsuario(
    'default.jpg',
    'Aluno Test',
    '000.000.000-13',
    '2000-01-02',
    1,
    'alunoteste@system.com',
    '$2a$15$BuFL/wiGSzMYWGVVbWoFOO7HWWawAOjAECxO79JK8SAUB8ybEKMHi',
    2
);

call InsereUsuario(
    'default.jpg',
    'Professor Teste',
    '000.000.000-14',
    '2000-01-03',
    1,
    'professorteste@system.com',
    '$2a$15$BuFL/wiGSzMYWGVVbWoFOO7HWWawAOjAECxO79JK8SAUB8ybEKMHi',
    3
);

call InsereSala(
    501,
    500,
    'Sala 501',
    'Sala de aula normal',
    35
);

call InsereSala(
    502,
    500,
    'Sala 502',
    'Sala de aula normal',
    25
);

call InsereSala(
    503,
    500,
    'Sala 503',
    'Sala de aula normal',
    25
);

call InsereSala(
    504,
    500,
    'Sala 504',
    'Sala de aula normal',
    32
);

call InsereSala(
    505,
    500,
    'Sala 505',
    'Sala de aula normal',
    30
);

call InsereSala(
    506,
    500,
    'Laboratório 506',
    'Laboratório de Informática',
    25
);

call InsereSala(
    507,
    500,
    'Sala 507',
    'Sala de aula normal',
    35
);

call InsereSala(
    508,
    500,
    'Laboratório 508',
    'Laboratório de Informática',
    30
);

call InsereSala(
    509,
    500,
    'Laboratório 509',
    'Laboratório de Informática',
    40
);

call InsereTurma(
    'AINFO',
    'Aprendizagem Industrial em Informática',
    '2023-02-07',
    2
);

call InsereTurma(
    'TINFO',
    'Técnico em Informática',
    '2023-02-07',
    4
);

call InsereTurma(
    'AISMR',
    'Aprendizagem Industrial em Sup. e Man. de Redes',
    '2023-02-07',
    4
);

call InsereTurma(
    'TINFOWEB',
    'Técnico em Informática para Web',
    '2023-02-07',
    3
);

call InsereTurma(
    'AIFP',
    'Aprendizagem Industrial em Fazer Pão',
    '2023-02-07',
    2
);

call InsereTurma(
    'AIMEC',
    'Aprendizagem Industrial em Mecânica',
    '2023-02-07',
    2
);

call InsereTurma(
    'AIEL',
    'Aprendizagem Industrial em Elétrica',
    '2023-02-07',
    2
);

call InsereReserva(
    'Aplicação de Prova',
    '2022-07-26',
    'Matutino',
    2,
    1,
    1
);

call InsereReserva(
    'Explicação de matéria nova',
    '2022-07-26',
    'Vespertino',
    2,
    2,
    2
);

call InsereReserva(
    'Aplicação do SAEP',
    '2022-07-26',
    'Noturno',
    2,
    4,
    6
);
