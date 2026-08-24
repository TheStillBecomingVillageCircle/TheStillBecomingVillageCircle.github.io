import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable, StyleSheet, Modal, TextInput, Alert } from 'react-native';

const scenes = [
  ['🌅','Becoming at Dawn','#F8E6C8','Something new is beginning.'],
  ['🌊','Becoming by the Water','#D9EEF1','I can pause and still be moving.'],
  ['🌳','Becoming in the Woods','#DCEAD9','I don’t need to see the entire path.'],
  ['🌻','Becoming in Bloom','#F7E8B8','Growth takes its own time.'],
  ['🌙','Becoming at Night','#BFC8DF','Rest is part of becoming.'],
  ['🌧️','Becoming After the Rain','#D4E0E4','Something can still grow after a difficult season.'],
  ['🏙️','Becoming in the City','#D8DDE7','Becoming while life is still happening.'],
  ['🏡','Becoming at Home','#F1E2D1','I am allowed to be where I am.'],
  ['🛤️','Becoming on the Road','#E7DFC9','The next step doesn’t require the whole map.'],
  ['☁️','Becoming in the Clouds','#EAF0F4','Not everything needs to be solved from where you’re standing.']
];

const motivations = [
  'You don’t have to become everything today. Just take this next step.',
  'You can pause without abandoning yourself.',
  'A pause is not a permanent decision.',
  'Gather yourself. You can make the decision when you’re ready. I’m here.',
  'You don’t need the whole map to take the next step.'
];

const emotions = [['😌','Calm'],['🙂','Okay'],['😐','Uneasy'],['😤','Frustrated'],['🔥','Angry'],['😵‍💫','Overwhelmed']];

export default function App(){
  const [tab,setTab]=useState('Home');
  const [scene,setScene]=useState(1);
  const [emotion,setEmotion]=useState(null);
  const [notReady,setNotReady]=useState(false);
  const [scenesOpen,setScenesOpen]=useState(false);
  const [addOpen,setAddOpen]=useState(false);
  const [title,setTitle]=useState(''); const [date,setDate]=useState(''); const [time,setTime]=useState('');
  const [appointments,setAppointments]=useState([{title:'Therapy Appointment',date:'Wednesday, August 26, 2026',time:'2:00 PM',type:'Therapy'}]);
  const [reflection,setReflection]=useState('');
  const bg=emotion==='Angry'?'#E6D5D0':emotion==='Overwhelmed'?'#DDE3EA':scenes[scene][2];
  const add=()=>{ if(!title||!date||!time){Alert.alert('Almost there','Add the appointment name, date, and time.');return;} setAppointments([...appointments,{title,date,time,type:'Personal'}]); setTitle('');setDate('');setTime('');setAddOpen(false); };
  return <SafeAreaView style={[s.safe,{backgroundColor:bg}]}>
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.header}><View><Text style={s.brand}>STILL BECOMING</Text><Text style={s.heading}>Reminder Circle</Text></View><Pressable style={s.sceneBtn} onPress={()=>setScenesOpen(true)}><Text style={s.emoji}>{scenes[scene][0]}</Text></Pressable></View>
      {tab==='Home'&&<>
        <View style={s.hero}><Text style={s.label}>INTENTIONAL STILL BECOMING</Text><Text style={s.motivation}>{motivations[new Date().getDate()%motivations.length]}</Text><Text style={s.muted}>{scenes[scene][1]} — {scenes[scene][3]}</Text></View>
        <View style={s.card}><Text style={s.label}>UP NEXT</Text><Text style={s.title}>{appointments[0].title}</Text><Text style={s.muted}>{appointments[0].date} · {appointments[0].time}</Text><Text style={s.pill}>{appointments[0].type}</Text><View style={s.row}><Pressable style={s.primary} onPress={()=>setNotReady(false)}><Text style={s.white}>I’m Ready</Text></Pressable><Pressable style={s.secondary} onPress={()=>setNotReady(true)}><Text style={s.dark}>I’m Not Ready Yet</Text></Pressable></View>{notReady&&<View style={s.pause}><Text style={s.title}>Need to take a moment?</Text><Text style={s.muted}>It’s okay. Take that moment. Gather yourself. I’ll let you make the decision when you’re ready. I’m here.</Text><Text style={s.next}>⏱️ 3-minute pause · Just take this next step.</Text></View>}</View>
        <View style={s.card}><Text style={s.label}>HOW ARE YOU FEELING?</Text><View style={s.emotions}>{emotions.map(([e,n])=><Pressable key={n} onPress={()=>setEmotion(n)} style={[s.emotion,emotion===n&&s.selected]}><Text style={s.emoji}>{e}</Text><Text style={s.emotionText}>{n}</Text></Pressable>)}</View>{emotion&&<View style={s.pause}><Text style={s.title}>{emotion==='Angry'?'Let’s come back to center. 🌱':'Thank you for checking in. 🌱'}</Text><Text style={s.muted}>{emotion==='Angry'?'You don’t have to respond from the hottest version of yourself.':'Notice where you are. You don’t have to force the next moment.'}</Text><Pressable style={s.primary} onPress={()=>setEmotion(null)}><Text style={s.white}>Take This Moment</Text></Pressable></View>}</View>
      </>}
      {tab==='Calendar'&&<View style={s.card}><Text style={s.label}>MY REMINDERS</Text>{appointments.map((a,i)=><View key={i} style={s.appointment}><View style={s.dot}/><View style={{flex:1}}><Text style={s.title}>{a.title}</Text><Text style={s.muted}>{a.date} · {a.time}</Text><Text style={s.pill}>{a.type}</Text></View></View>)}<Pressable style={s.primary} onPress={()=>setAddOpen(true)}><Text style={s.white}>＋ Remember Something</Text></Pressable></View>}
      {tab==='Becoming'&&<View style={s.card}><Text style={s.label}>MY BECOMING</Text><Text style={s.title}>What are you carrying forward?</Text><TextInput value={reflection} onChangeText={setReflection} multiline placeholder="Write a thought, realization, or next step…" style={s.textArea}/><Pressable style={s.primary} onPress={()=>Alert.alert('Saved 🌱','Your reflection is saved in this prototype.')}><Text style={s.white}>Save Reflection</Text></Pressable></View>}
      {tab==='Profile'&&<View style={s.card}><Text style={s.label}>MY BECOMING SCENERY</Text><Text style={s.title}>{scenes[scene][0]} {scenes[scene][1]}</Text><Text style={s.muted}>{scenes[scene][3]}</Text><Pressable style={s.secondary} onPress={()=>setScenesOpen(true)}><Text style={s.dark}>Choose another scenery</Text></Pressable></View>}
    </ScrollView>
    <View style={s.nav}>{['Home','Calendar','Becoming','Profile'].map(n=><Pressable key={n} onPress={()=>setTab(n)}><Text style={[s.navText,tab===n&&s.active]}>{n}</Text></Pressable>)}</View>
    <Modal visible={scenesOpen} transparent animationType="slide"><View style={s.backdrop}><View style={s.modal}><Text style={s.modalTitle}>Where are you becoming today?</Text><ScrollView>{scenes.map((x,i)=><Pressable key={x[1]} style={[s.choice,scene===i&&s.selected]} onPress={()=>{setScene(i);setScenesOpen(false)}}><Text style={s.emoji}>{x[0]}</Text><View style={{flex:1}}><Text style={s.title}>{x[1]}</Text><Text style={s.muted}>{x[3]}</Text></View>{scene===i&&<Text>✓</Text>}</Pressable>)}</ScrollView></View></View></Modal>
    <Modal visible={addOpen} transparent animationType="slide"><View style={s.backdrop}><View style={s.modal}><Text style={s.modalTitle}>Remember Something</Text><TextInput style={s.input} placeholder="Appointment name" value={title} onChangeText={setTitle}/><TextInput style={s.input} placeholder="Date" value={date} onChangeText={setDate}/><TextInput style={s.input} placeholder="Time" value={time} onChangeText={setTime}/><Pressable style={s.primary} onPress={add}><Text style={s.white}>Save Reminder</Text></Pressable><Pressable style={s.secondary} onPress={()=>setAddOpen(false)}><Text style={s.dark}>Cancel</Text></Pressable></View></View></Modal>
  </SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1},page:{padding:20,paddingBottom:110},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20},brand:{fontSize:11,letterSpacing:2,fontWeight:'900',color:'#52706B'},heading:{fontSize:29,fontWeight:'900',color:'#183B3A',marginTop:4},sceneBtn:{width:54,height:54,borderRadius:18,backgroundColor:'rgba(255,255,255,.72)',alignItems:'center',justifyContent:'center'},emoji:{fontSize:25},hero:{marginBottom:14},label:{fontSize:11,letterSpacing:1.5,fontWeight:'900',color:'#52706B',marginBottom:9},motivation:{fontSize:25,lineHeight:32,fontWeight:'900',color:'#183B3A'},muted:{color:'#627671',fontSize:14,lineHeight:21,marginTop:7},card:{backgroundColor:'rgba(255,255,255,.88)',borderRadius:22,padding:18,marginBottom:14},title:{fontSize:18,fontWeight:'900',color:'#183B3A'},pill:{alignSelf:'flex-start',backgroundColor:'#EDF5F2',color:'#3F625D',borderRadius:99,paddingHorizontal:9,paddingVertical:4,marginTop:8,fontSize:11,fontWeight:'800'},row:{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:10},primary:{backgroundColor:'#183B3A',paddingHorizontal:16,paddingVertical:13,borderRadius:13,alignItems:'center',marginTop:12},secondary:{backgroundColor:'#E7F2EE',paddingHorizontal:16,paddingVertical:13,borderRadius:13,alignItems:'center',marginTop:8},white:{color:'#fff',fontWeight:'900'},dark:{color:'#183B3A',fontWeight:'900'},pause:{backgroundColor:'#F2F8F5',borderRadius:17,padding:15,marginTop:14},next:{color:'#183B3A',fontSize:16,lineHeight:23,fontWeight:'900',marginTop:12},emotions:{flexDirection:'row',flexWrap:'wrap',gap:8},emotion:{width:'31%',minWidth:90,paddingVertical:11,borderRadius:14,backgroundColor:'#F1F6F3',alignItems:'center'},selected:{borderWidth:2,borderColor:'#183B3A',backgroundColor:'#E2F0EB'},emotionText:{marginTop:3,fontSize:12,fontWeight:'800',color:'#49625D'},appointment:{flexDirection:'row',gap:12,alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E6EEEB'},dot:{width:12,height:12,borderRadius:99,backgroundColor:'#6F9D8D'},textArea:{minHeight:140,marginTop:15,borderWidth:1,borderColor:'#CBDDD7',borderRadius:14,padding:13,textAlignVertical:'top',backgroundColor:'#fff',fontSize:16},nav:{position:'absolute',left:12,right:12,bottom:12,height:70,borderRadius:22,backgroundColor:'rgba(255,255,255,.96)',flexDirection:'row',justifyContent:'space-around',alignItems:'center'},navText:{fontSize:12,color:'#7C8C88',fontWeight:'700'},active:{color:'#183B3A',fontWeight:'900'},backdrop:{flex:1,backgroundColor:'rgba(13,31,29,.45)',justifyContent:'flex-end'},modal:{backgroundColor:'#F7FCF9',borderTopLeftRadius:28,borderTopRightRadius:28,padding:20,maxHeight:'88%'},modalTitle:{fontSize:23,fontWeight:'900',color:'#183B3A',marginBottom:15},choice:{flexDirection:'row',alignItems:'center',gap:12,padding:13,borderRadius:15,marginBottom:7,backgroundColor:'#fff'},input:{borderWidth:1,borderColor:'#CBDDD7',borderRadius:13,padding:13,marginBottom:9,backgroundColor:'#fff',fontSize:16}});
