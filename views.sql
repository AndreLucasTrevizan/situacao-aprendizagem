delimiter $$
create view RelatorioTurmas as
    select * from turma;
delimiter ;

delimiter $$
create view RelatorioSalas as
    select * from sala;
delimiter ;

delimiter $$
create view RelatorioUsuarios
    select * from usuario;
delimiter ;

delimiter $$
create view RelatorioReservas as
    select
        professor.avatar as avatar,
        professor.nome as professor,
        sala.apelido as numero_sala,
        sala.descricao_tipo as descricao_sala,
        reserva.periodo as periodo,
        turma.apelido as turma
    from reserva
        inner join professor on professor.id = reserva.id_professor
        inner join sala on sala.id = reserva.id_sala
        inner join turma on turma.id = reserva.id_turma;
delimiter ;
