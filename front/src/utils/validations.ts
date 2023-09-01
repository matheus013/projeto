export const isCpfValid = (value: string): boolean => {
  if (value.includes(".") || value.includes("-")) {
    value = value.replaceAll(".", "");
    value = value.replace("-", "");

  }

  let sum = 0;
  let rest;

  if (value == "00000000000") return false;
  if (value == "11111111111") return false;
  if (value == "22222222222") return false;
  if (value == "33333333333") return false;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(value.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(value.substring(10, 11))) return false;

  return true;
};

export const isCnpjValid = (cnpj: string): boolean => {
  cnpj = cnpj.replaceAll("-", "");
  cnpj = cnpj.replaceAll(".", "");
  cnpj = cnpj.replace("/0001", "");
  cnpj = cnpj.replace("/0002", "");
  let tamanho;
  let numeros: any;
  let pos: any;
  let resultado: any;
  let soma: number;
  let digitos;
  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  // Valida DVs
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
};

export const isCepValid = async (cep: string) => {
  cep = cep.replace("-", "");

  let url = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(url, {});

  if(response.status == 200){
    return true;
  }

  return false;
};
