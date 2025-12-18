import 'package:flutter/material.dart';
import 'package:flutter_application_1/profil.dart';
import 'package:uuid/uuid.dart';
import 'sport_goal.dart';
import 'sport_goal_storage.dart';
import 'validators.dart';

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
  
  
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            _buildSportDropdown(),
            const SizedBox(height: 12),
            _buildFrequencyField(),
            const SizedBox(height: 12),
            _buildDurationField(),
            const SizedBox(height: 20),
            _buildSaveButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildSportDropdown() {
    return DropdownButtonFormField<String>(
      value: _selectedSport,
      decoration: const InputDecoration(
        labelText: 'Type d’activité',
        border: OutlineInputBorder(),
      ),
      items: _availableSports
          .map((sport) => DropdownMenuItem(
                value: sport,
                child: Text(sport),
              ))
          .toList(),
      onChanged: (value) => _selectedSport = value!,
    );
  }

  Widget _buildFrequencyField() {
    return TextFormField(
      initialValue: _defaultFrequencyPerWeek.toString(),
      keyboardType: TextInputType.number,
      decoration: const InputDecoration(
        labelText: 'Fréquence / semaine',
        border: OutlineInputBorder(),
      ),
      validator: (value) => validatePositiveInteger(value),
      onSaved: (value) => _frequencyPerWeek = int.parse(value!),
    );
  }

  Widget _buildDurationField() {
    return TextFormField(
      initialValue: _defaultDurationMinutes.toString(),
      keyboardType: TextInputType.number,
      decoration: const InputDecoration(
        labelText: 'Durée par séance (min)',
        border: OutlineInputBorder(),
      ),
      validator: (value) => validatePositiveInteger(value),
      onSaved: (value) => _sessionDurationMinutes = int.parse(value!),
    );
  }

  Widget _buildSaveButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton.icon(
        onPressed: _saveGoal,
        icon: const Icon(Icons.save),
        label: const Text('Enregistrer et voir mon profil'),
      ),
    );
  }
}
