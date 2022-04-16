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