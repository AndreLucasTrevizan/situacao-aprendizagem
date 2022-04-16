-- Procedures ---------------------------------------------------------------------------

delimiter $$
create procedure InsereUsuario(
    p_avatar varchar(20),
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
	insert into usuario (
		`avatar`, `nome`, `cpf`, `dt_nascimento`, `sexo`, `email`, `senha`, `situacao`, `funcao`
    ) values (
		p_avatar, p_nome, p_cpf, p_dt_nascimento, p_sexo, p_email, p_senha, p_situacao, p_funcao
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
create procedure EditarUsuario(
    p_id int not null,
    p_avatar varchar(20),
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
	update usuario set 
        `nome` = p_nome,
		`cpf` = p_cpf,
        `dt_nascimento` = p_dt_nascimento,
        `sexo` = p_sexo,
        `email` = p_email,
        `senha` = p_senha,
        `situacao` = p_situacao
    where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure EditarSala(
    p_id int not null,
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
        `capacidade` = p_capacidade 
    where `id` = p_id
end$$
delimiter ;

delimiter $$
create procedure EditarTurma(
    p_id int not null,
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
    where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure EditarReserva(
    p_id int not null,
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
    where `id` = p_id 
end$$
delimiter ;

delimiter $$
create procedure DeletarUsuario(
    p_id int not null
)
begin
    delete from usuario where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure DeletarTurma(
    p_id int not null
)
begin
    delete from turma where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure DeletarSala(
    p_id int not null
)
begin
    delete from sala where `id` = p_id;
end$$
delimiter ;

delimiter $$
create procedure DeletarReserva(
    p_id int not null
)
begin
    delete from reserva where `id` = p_id;
end$$
delimiter ;