use situacaoaprendizagem;

create table usuario (
	id int not null auto_increment,
    nome varchar(100) not null,
    cpf varchar(14) not null,
    dt_nascimento date,
    sexo int,
    email varchar(100) not null,
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

-- Procedures ---------------------------------------------------------------------------

delimiter $$
create procedure InsereUsuario(
	p_nome varchar(100),
    p_cpf varchar(14),
    p_dt_nascimento date,
    p_sexo int,
    p_email varchar(100),
    p_senha varchar(250),
    p_situacao int,
    p_funcao int
)
begin
	insert into aluno (
		`nome`, `cpf`, `dt_nascimento`, `sexo`, `email`, `senha`, `situacao`, `funcao`
    ) values (
		p_nome, p_cpf, p_dt_nascimento, p_sexo, p_email, p_senha, p_situacao, p_funcao
    );
end$$
delimiter ;

















