import { Pessoa } from '../entity/pessoa'

const pessoasDouble = [
  {
    idPessoa: '99ca3011-a740-41c5-9517-5058581150ac',
    nome: 'Renan Moraes',
    cpf: '123.022.316-94',
    dataNascimento: new Date('1993-01-21')
  } as Pessoa,
  {
    idPessoa: '99ca3011-a740-41c5-9517-5058581150ad',
    nome: 'Felipe Marques',
    cpf: '111.222.333-44',
    dataNascimento: new Date('1992-01-21')
  } as Pessoa,
  {
    idPessoa: '99ca3011-a740-41c5-9517-5058581150ae',
    nome: 'Marina Oliveira',
    cpf: '123.456.789-10',
    dataNascimento: new Date('1992-05-12')
  } as Pessoa
] as Pessoa[]

export default pessoasDouble
