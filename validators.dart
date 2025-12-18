String? validatePositiveInteger(String? value) {
  final parsedValue = int.tryParse(value ?? '');
  if (parsedValue == null || parsedValue <= 0) {
    return 'Veuillez entrer un nombre positif';
  }
  return null;
}
