import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

const emotions = ['Calm', 'Okay', 'Uneasy', 'Frustrated', 'Angry', 'Overwhelmed'];

const starterReminder = {
  title: 'Therapy Appointment',
  date: 'Wednesday, August 26, 2026',
  time: '2:00 PM',
  type: 'Therapy',
};

export default function App() {
  const [tab, setTab] = useState('Home');
  const [emotion, setEmotion] = useState(null);
  const [notReady, setNotReady] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [reflection, setReflection] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointments, setAppointments] = useState([starterReminder]);

  const nextReminder = useMemo(() => appointments[0] || starterReminder, [appointments]);

  const addReminder = () => {
    if (!title.trim() || !date.trim() || !time.trim()) {
      Alert.alert('Almost there', 'Add the reminder name, date, and time.');
      return;
    }

    setAppointments((current) => [
      ...current,
      { title: title.trim(), date: date.trim(), time: time.trim(), type: 'Personal' },
    ]);
    setTitle('');
    setDate('');
    setTime('');
    setAddOpen(false);
  };

  const saveReflection = () => {
    if (!reflection.trim()) {
      Alert.alert('A little something first', 'Write whatever is sitting on your heart.');
      return;
    }
    Alert.alert('Saved ✨', 'Your reflection is part of your becoming.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>THE STILL BECOMING</Text>
            <Text style={styles.heading}>Reminder Circle</Text>
          </View>
          <View style={styles.graceFrame}>
            <Grace />
          </View>
        </View>

        {tab === 'Home' && (
          <>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>YOUR NEXT STEP</Text>
              <Text style={styles.motivation}>
                You do not have to become everything today. Just take this next step.
              </Text>
              <Text style={styles.muted}>Your reminders. Your moments. Your becoming.</Text>
            </View>

            <View style={styles.reminder}>
              <Text style={styles.label}>UP NEXT</Text>
              <Text style={styles.title}>{nextReminder.title}</Text>
              <Text style={styles.muted}>{nextReminder.date} · {nextReminder.time}</Text>
              <Text style={styles.tag}>{nextReminder.type}</Text>

              <View style={styles.row}>
                <Pressable style={styles.primary} onPress={() => setNotReady(false)}>
                  <Text style={styles.white}>I'm Ready</Text>
                </Pressable>
                <Pressable style={styles.secondary} onPress={() => setNotReady(true)}>
                  <Text style={styles.dark}>Not Ready Yet</Text>
                </Pressable>
              </View>

              {notReady && (
                <View style={styles.pause}>
                  <Text style={styles.title}>Take your moment.</Text>
                  <Text style={styles.muted}>
                    You can pause without abandoning yourself. Gather yourself. Then take the next step when you're ready.
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>HOW ARE YOU FEELING?</Text>
              <View style={styles.emotions}>
                {emotions.map((name) => (
                  <Pressable
                    key={name}
                    onPress={() => setEmotion(name)}
                    style={[styles.emotion, emotion === name && styles.selected]}
                  >
                    <Text style={styles.emotionText}>{name}</Text>
                  </Pressable>
                ))}
              </View>

              {emotion && (
                <View style={styles.pause}>
                  <Text style={styles.title}>
                    {emotion === 'Angry' ? "Let's come back to center." : 'Thank you for checking in.'}
                  </Text>
                  <Text style={styles.muted}>
                    {emotion === 'Angry'
                      ? 'You do not have to respond from the hottest version of yourself.'
                      : 'Notice where you are. You do not have to force the next moment.'}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.quoteCard}>
              <Text style={styles.quoteMark}>“</Text>
              <Text style={styles.quote}>Still becoming is not a failure to arrive.</Text>
              <Text style={styles.quoteSmall}>It is permission to keep growing.</Text>
            </View>
          </>
        )}

        {tab === 'Calendar' && (
          <View style={styles.card}>
            <Text style={styles.label}>MY REMINDERS</Text>
            {appointments.map((appointment, index) => (
              <View key={`${appointment.title}-${index}`} style={styles.appointment}>
                <View style={styles.dot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{appointment.title}</Text>
                  <Text style={styles.muted}>{appointment.date} · {appointment.time}</Text>
                  <Text style={styles.tag}>{appointment.type}</Text>
                </View>
              </View>
            ))}
            <Pressable style={styles.primaryFull} onPress={() => setAddOpen(true)}>
              <Text style={styles.white}>＋ Add Reminder</Text>
            </Pressable>
          </View>
        )}

        {tab === 'Becoming' && (
          <View style={styles.card}>
            <Text style={styles.label}>MY BECOMING</Text>
            <Text style={styles.title}>What are you carrying forward?</Text>
            <Text style={styles.muted}>
              Not a performance. Not a perfect answer. Just a place to tell the truth.
            </Text>
            <TextInput
              value={reflection}
              onChangeText={setReflection}
              multiline
              placeholder="Write a thought, realization, or next step…"
              placeholderTextColor="#8CA09B"
              style={styles.textArea}
            />
            <Pressable style={styles.primaryFull} onPress={saveReflection}>
              <Text style={styles.white}>Save Reflection</Text>
            </Pressable>
          </View>
        )}

        {tab === 'Profile' && (
          <View style={styles.card}>
            <Text style={styles.label}>YOUR VILLAGE COMPANION</Text>
            <Grace large />
            <Text style={[styles.title, { textAlign: 'center', marginTop: 10 }]}>Grace gives you room to become.</Text>
            <Text style={[styles.muted, { textAlign: 'center' }]}>
              The app is your reminder and motivation companion. The Village website is the wider world around it.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.nav}>
        {[
          ['Home', '⌂'],
          ['Calendar', '◷'],
          ['Becoming', '✦'],
          ['Profile', '○'],
        ].map(([name, icon]) => (
          <Pressable key={name} style={styles.navItem} onPress={() => setTab(name)}>
            <Text style={[styles.navIcon, tab === name && styles.active]}>{icon}</Text>
            <Text style={[styles.navText, tab === name && styles.active]}>{name}</Text>
          </Pressable>
        ))}
      </View>

      <Modal visible={addOpen} transparent animationType="slide" onRequestClose={() => setAddOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Reminder</Text>
            <TextInput style={styles.input} placeholder="What do you need to remember?" placeholderTextColor="#8CA09B" value={title} onChangeText={setTitle} />
            <TextInput style={styles.input} placeholder="Date" placeholderTextColor="#8CA09B" value={date} onChangeText={setDate} />
            <TextInput style={styles.input} placeholder="Time" placeholderTextColor="#8CA09B" value={time} onChangeText={setTime} />
            <Pressable style={styles.primaryFull} onPress={addReminder}>
              <Text style={styles.white}>Save Reminder</Text>
            </Pressable>
            <Pressable style={styles.secondaryFull} onPress={() => setAddOpen(false)}>
              <Text style={styles.dark}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Grace({ large = false }) {
  return (
    <View style={[styles.grace, large && styles.graceLarge]}>
      <View style={styles.hair} />
      <View style={styles.face} />
      <View style={styles.glasses}>
        <View style={styles.glassLens} />
        <View style={styles.glassLens} />
      </View>
      <View style={styles.neck} />
      <View style={styles.body} />
      <View style={styles.gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F2FCF8' },
  page: { padding: 20, paddingBottom: 120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  brand: { fontSize: 10, letterSpacing: 2.1, fontWeight: '900', color: '#68827C' },
  heading: { fontSize: 30, fontWeight: '900', color: '#244744', marginTop: 4, letterSpacing: -0.7 },
  graceFrame: { width: 78, height: 78, borderRadius: 39, overflow: 'hidden', backgroundColor: '#D9F7EF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#C7E9DF' },
  grace: { width: 70, height: 74, position: 'relative' },
  graceLarge: { width: 210, height: 225, alignSelf: 'center', marginVertical: 6 },
  hair: { position: 'absolute', top: 1, left: '17%', width: '66%', height: '57%', backgroundColor: '#241F23', borderRadius: 55 },
  face: { position: 'absolute', top: '23%', left: '24%', width: '52%', height: '48%', backgroundColor: '#A96D50', borderRadius: 50 },
  glasses: { position: 'absolute', top: '38%', left: '20%', width: '60%', height: 18, flexDirection: 'row', justifyContent: 'space-between' },
  glassLens: { width: '43%', height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#2D4945', backgroundColor: 'rgba(235,255,249,.24)' },
  neck: { position: 'absolute', top: '67%', left: '42%', width: '16%', height: '15%', backgroundColor: '#A96D50' },
  body: { position: 'absolute', bottom: 0, left: '10%', width: '80%', height: '31%', backgroundColor: '#4C9B91', borderTopLeftRadius: 44, borderTopRightRadius: 44 },
  gold: { position: 'absolute', top: '47%', left: '47%', width: 8, height: 8, borderRadius: 5, backgroundColor: '#D8B866' },
  hero: { paddingVertical: 18 },
  eyebrow: { fontSize: 10, letterSpacing: 2, fontWeight: '900', color: '#66817A', marginBottom: 10 },
  motivation: { fontSize: 28, lineHeight: 36, fontWeight: '900', color: '#244744', letterSpacing: -0.6 },
  muted: { color: '#637773', fontSize: 14, lineHeight: 21, marginTop: 7 },
  reminder: { backgroundColor: '#FFFDFC', borderRadius: 28, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: '#DCEBE6' },
  card: { backgroundColor: 'rgba(255,255,255,.94)', borderRadius: 25, padding: 19, marginBottom: 14, borderWidth: 1, borderColor: '#E1EFEB' },
  label: { fontSize: 10, letterSpacing: 1.8, fontWeight: '900', color: '#648079', marginBottom: 9 },
  title: { fontSize: 19, fontWeight: '900', color: '#244744' },
  tag: { alignSelf: 'flex-start', backgroundColor: '#EFF7F3', color: '#496760', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginTop: 8, fontSize: 10, fontWeight: '900', overflow: 'hidden' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  primary: { backgroundColor: '#244744', paddingHorizontal: 16, paddingVertical: 13, borderRadius: 15, alignItems: 'center', marginTop: 12 },
  primaryFull: { backgroundColor: '#244744', paddingVertical: 14, borderRadius: 15, alignItems: 'center', marginTop: 14 },
  secondary: { backgroundColor: '#E6F3EE', paddingHorizontal: 16, paddingVertical: 13, borderRadius: 15, alignItems: 'center', marginTop: 8 },
  secondaryFull: { backgroundColor: '#E6F3EE', paddingVertical: 14, borderRadius: 15, alignItems: 'center', marginTop: 9 },
  white: { color: '#FFFFFF', fontWeight: '900' },
  dark: { color: '#244744', fontWeight: '900' },
  pause: { backgroundColor: '#F1F8F5', borderRadius: 18, padding: 15, marginTop: 14, borderWidth: 1, borderColor: '#E0EEE9' },
  emotions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  emotion: { width: '31%', minWidth: 90, paddingVertical: 13, borderRadius: 15, backgroundColor: '#F1F7F4', alignItems: 'center' },
  selected: { borderWidth: 2, borderColor: '#244744', backgroundColor: '#E2F0EB' },
  emotionText: { fontSize: 12, fontWeight: '900', color: '#49625D' },
  quoteCard: { backgroundColor: '#DDF6EF', borderRadius: 25, padding: 22, marginBottom: 14 },
  quoteMark: { fontSize: 40, lineHeight: 35, color: '#5E968C', fontWeight: '900' },
  quote: { fontSize: 20, lineHeight: 28, fontWeight: '900', color: '#244744', marginTop: 3 },
  quoteSmall: { fontSize: 13, color: '#58736D', marginTop: 8 },
  appointment: { flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#E6EEEB' },
  dot: { width: 11, height: 11, borderRadius: 99, backgroundColor: '#70A598' },
  textArea: { minHeight: 150, marginTop: 15, borderWidth: 1, borderColor: '#CBDDD7', borderRadius: 15, padding: 13, textAlignVertical: 'top', backgroundColor: '#FFFFFF', fontSize: 16, color: '#244744' },
  nav: { position: 'absolute', left: 12, right: 12, bottom: 12, height: 72, borderRadius: 25, backgroundColor: 'rgba(255,255,255,.98)', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: '#DCEBE6' },
  navItem: { alignItems: 'center', justifyContent: 'center', minWidth: 65 },
  navIcon: { fontSize: 18, color: '#93A39F', marginBottom: 2 },
  navText: { fontSize: 11, color: '#82918D', fontWeight: '800' },
  active: { color: '#244744', fontWeight: '900' },
  backdrop: { flex: 1, backgroundColor: 'rgba(18,43,40,.38)', justifyContent: 'flex-end' },
  modal: { backgroundColor: '#F7FCF9', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, paddingBottom: 28 },
  modalTitle: { fontSize: 24, fontWeight: '900', color: '#244744', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#CBDDD7', borderRadius: 14, padding: 14, marginBottom: 9, backgroundColor: '#FFFFFF', fontSize: 16, color: '#244744' },
});
