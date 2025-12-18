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
  final _formKey = GlobalKey<FormState>();
  String _sport = 'Course';
  int _freq = 3;
  int _duration = 30;

  Future<void> _saveGoal() async {
    if (!_formKey.currentState!.validate()) return; //vérification des champs via validators
    _formKey.currentState!.save(); //sauvegarde les valeurs des champs via onSaved

    final goal = SportGoal(
      id: const Uuid().v4(),
      sport: _sport,
      frequencyPerWeek: _freq,
      durationMinutes: _duration,
    );

    await SportGoalStorage.addGoal(goal);

    if (!mounted) return; // Vérification que le widget est toujours dans l’arbre
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
            DropdownButtonFormField<String>(
              value: _sport,
              decoration: const InputDecoration(
                labelText: 'Type d’activité',
                border: OutlineInputBorder(),
              ),
              items: const [
                DropdownMenuItem(value: 'Course', child: Text('Course')),
                DropdownMenuItem(value: 'Marche', child: Text('Marche')),
                DropdownMenuItem(value: 'Vélo', child: Text('Vélo')),
              ],
              onChanged: (v) => _sport = v!,
            ),
            const SizedBox(height: 12),
            TextFormField(
              initialValue: '3',
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Fréquence / semaine',
                border: OutlineInputBorder(),
              ),
              validator: (v) {
                final n = int.tryParse(v ?? '');
                if (n == null || n <= 0) return 'Nombre invalide';
                return null;
              },
              onSaved: (v) => _freq = int.parse(v!),
            ),
            const SizedBox(height: 12),
            TextFormField(
              initialValue: '30',
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Durée par séance (min)',
                border: OutlineInputBorder(),
              ),
              validator: (v) {
                final n = int.tryParse(v ?? '');
                if (n == null || n <= 0) return 'Nombre invalide';
                return null;
              },
              onSaved: (v) => _duration = int.parse(v!),
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
