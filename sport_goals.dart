import 'package:flutter/material.dart';
import 'package:flutter_application_1/profil.dart';
import 'package:uuid/uuid.dart';
import 'sport_goal.dart';
import 'sport_goal_storage.dart';

class SportGoals extends StatefulWidget {
  const SportGoals({super.key});

  @override
  State<SportGoals> createState() => _SportGoalsState();
}

class _SportGoalsState extends State<SportGoals> {
  static const List<String> _availableSports = ['Course', 'Marche', 'Vélo'];
  static const int _defaultFrequencyPerWeek = 3;
  static const int _defaultDurationMinutes = 30;

  final _formKey = GlobalKey<FormState>();
  String _selectedSport = _availableSports[0];
  int _frequencyPerWeek = _defaultFrequencyPerWeek;
  int _sessionDurationMinutes = _defaultDurationMinutes;

  Future<void> _saveGoal() async {
    if (_FormIsNotValid()) return;
    _formKey.currentState!.save();

    final newGoal = _createGoal();
    await SportGoalStorage.addGoal(newGoal);

    if (!mounted) return;
    _navigateToProfile();
    
  }

  bool _FormIsNotValid() {
    return !_formKey.currentState!.validate();
  }

  SportGoal _createGoal() {
    return SportGoal(
      id: const Uuid().v4(),
      sport: _selectedSport,
      frequencyPerWeek: _frequencyPerWeek,
      durationMinutes: _sessionDurationMinutes,
    );
  }

  void _navigateToProfile() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const Profile()),
    );
  }
  
  String? _validatePositiveInteger(String? value) {
    final parsedValue = int.tryParse(value ?? '');
    if (parsedValue == null || parsedValue <= 0) {
      return 'Veuillez entrer un nombre positif';
    }
    return null;
  }
  
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            DropdownButtonFormField<String>(
              value: _selectedSport,
              decoration: const InputDecoration(
                labelText: 'Type d’activité',
                border: OutlineInputBorder(),
              ),
              items: const [
                DropdownMenuItem(value: 'Course', child: Text('Course')),
                DropdownMenuItem(value: 'Marche', child: Text('Marche')),
                DropdownMenuItem(value: 'Vélo', child: Text('Vélo')),
              ],
              onChanged: (v) => _selectedSport = v!,
            ),
            const SizedBox(height: 12),
            TextFormField(
              initialValue: '3',
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Fréquence / semaine',
                border: OutlineInputBorder(),
              ),
              validator: (v) => _validatePositiveInteger(v),
              onSaved: (v) => _frequencyPerWeek = int.parse(v!),
            ),
            const SizedBox(height: 12),
            TextFormField(
              initialValue: '30',
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Durée par séance (min)',
                border: OutlineInputBorder(),
              ),
              validator: (v) => _validatePositiveInteger(v),
              onSaved: (v) => _sessionDurationMinutes = int.parse(v!),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: _saveGoal,
                icon: const Icon(Icons.save),
                label: const Text('Enregistrer et voir mon profil'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
