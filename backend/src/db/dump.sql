CREATE SCHEMA `atividade_avaliativa`; -- Cria o banco de dados

CREATE TABLE `atividade_avaliativa`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NULL,
  `cpf` BIGINT NULL,
  `senha` CHAR(64) NULL,
  `tipo_usuario` varchar(225) NULL,
  `ativo` INT NULL DEFAULT 1,
  PRIMARY KEY (`id`));
