import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable, StyleSheet, Modal, TextInput, Alert, Linking } from 'react-native';

const places = [
  ['Home', 'The place to arrive.', '#EAF7F3'],
  ['Inside the Bubble', 'A softer place to breathe.', '#E8F7F7'],
  ['The Unknown', 'You do not need the whole map.', '#EEF4EA'],
  ['Experiences', 'Moments worth remembering.', '#F7F0E7'],
  ['Webspace', 'A quiet place to wander.', '#E8EEF4'],
  ['Connect', 'Come closer. Be here.', '#F4ECEC'],
  ['Support', 'You do not have to carry it alone.', '#F7F2E7']
];

const motivations = [
  'You don’t have to become everything today. Just take this next step.',
  'You can pause without abandoning yourself.',
  'A pause is not a permanent decision.',
  'Gather yourself. You can make the decision when you’re ready. I’m here.',
  'You don’t need the whole map to take the next step.'
];

const emotions = [['Calm','Calm'],['Okay','Okay'],['Uneasy','Uneasy'],['Frustrated','Frustrated'],['Angry','Angry'],['Overwhelmed','Overwhelmed']];

const WEBSPACE_URL = 'https://thestillbecomingvillagecircle.org/web-design.html';

function VillageVisual({ type, small = false }) {
  return (
    <View style={[s.visual, small && s.visualSmall]}>
      {type === 'Home' && <>
        <View style={s.cloudLarge}/><View style={s.house}><View style={s.roof}/><View style={s.houseWindow}/><View style={s.door}/></View>
      </>}
      {type === 'Inside the Bubble' && <>
        <View style={s.wand}><View style={s.wandRing}/></View><View style={s.bubble}/><View style={s.bubbleGlow}/><View style={s.tinyBubble}/>
      </>}
      {type === 'The Unknown' && <>
        <View style={s.treeTrunk}/><View style={s.treeCanopy}/><View style={[s.leaf,s.leaf1]}/><View style={[s.leaf,s.leaf2]}/><View style={[s.leaf,s.leaf3]}/><View style={[s.leaf,s.leaf4]}/><View style={[s.fallingLeaf,s.fall1]}/><View style={[s.fallingLeaf,s.fall2]}/>
      </>}
      {type === 'Experiences' && <><View style={[s.photo,s.photo1]}><View style={s.photoImage1}/></View><View style={[s.photo,s.photo2]}><View style={s.photoImage2}/></View></>}
      {type === 'Webspace' && <><View style={s.window}><View style={s.moon}/><View style={s.star1}/><View style={s.star2}/><View style={s.windowGlow}/></View></>}
      {type === 'Connect' && <><View style={[s.ribbon,s.ribbon1]}/><View style={[s.ribbon,s.ribbon2]}/><View style={s.connectLight}/></>}
      {type === 'Support' && <><View style={s.supportGlow}/><View style={[s.hand,s.hand1]}/><View style={[s.hand,s.hand2]}/></>}
    </View>
  );
}

export default function App(){
  const [tab,setTab]=useState('Home');
  const [place,setPlace]=useState('Home');
  const [emotion,setEmotion]=useState(null);
  const [notReady,setNotReady]=useState(false);
  const [placesOpen,setPlacesOpen]=useState(false);
  const [addOpen,setAddOpen]=useState(false);
  const [title,setTitle]=useState(''); const [date,setDate]=useState(''); const [time,setTime]=useState('');
  const [appointments,setAppointments]=useState([{title:'Therapy Appointment',date:'Wednesday, August 26, 2026',time:'2:00 PM',type:'Therapy'}]);
  const [reflection,setReflection]=useState('');
  const bg=emotion==='Angry'?'#E9DAD5':emotion==='Overwhelmed'?'#E1E8ED':places.find(p=>p[0]===place)?.[2] || '#EAF7F3';
  const add=()=>{ if(!title||!date||!time){Alert.alert('Almost there','Add the appointment name, date, and time.');return;} setAppointments([...appointments,{title,date,time,type:'Personal'}]); setTitle('');setDate('');setTime('');setAddOpen(false); };
  const openWebspace=()=>Linking.openURL(WEBSPACE_URL).catch(()=>Alert.alert('Webspace','Open the Village website to enter Webspace.'));
  const wanderWebspace=()=>{setPlace('Webspace');setPlacesOpen(false);};
  return <SafeAreaView style={[s.safe,{backgroundColor:bg}]}>
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.header}>
        <View style={s.headerBrand}>
          <Text style={s.brand}>THE STILL BECOMING</Text>
          <Text style={s.heading}>Village Circle</Text>
          <Pressable style={s.webspaceLink} onPress={openWebspace} accessibilityRole="link">
            <Text style={s.webspaceLinkText}>↗ Webspace</Text>
          </Pressable>
        </View>
        <Pressable onPress={()=>setPlacesOpen(true)}><VillageVisual type={place} small /></Pressable>
      </View>
      {tab==='Home'&&<>
        <View style={s.hero}><Text style={s.eyebrow}>COME AS YOU ARE</Text><Text style={s.motivation}>{motivations[new Date().getDate()%motivations.length]}</Text><Text style={s.muted}>{places.find(p=>p[0]===place)?.[1]}</Text></View>
        <Pressable style={s.heroPlace} onPress={()=>setPlacesOpen(true)}><VillageVisual type={place}/><Text style={s.placeName}>{place}</Text><Text style={s.placeHint}>tap to wander</Text></Pressable>
        <View style={s.card}><Text style={s.label}>UP NEXT</Text><Text style={s.title}>{appointments[0].title}</Text><Text style={s.muted}>{appointments[0].date} · {appointments[0].time}</Text><Text style={s.tag}>{appointments[0].type}</Text><View style={s.row}><Pressable style={s.primary} onPress={()=>setNotReady(false)}><Text style={s.white}>I’m Ready</Text></Pressable><Pressable style={s.secondary} onPress={()=>setNotReady(true)}><Text style={s.dark}>I’m Not Ready Yet</Text></Pressable></View>{notReady&&<View style={s.pause}><Text style={s.title}>Need to take a moment?</Text><Text style={s.muted}>It’s okay. Take that moment. Gather yourself. I’ll let you make the decision when you’re ready. I’m here.</Text><Text style={s.next}>⏱ 3-minute pause · Just take this next step.</Text></View>}</View>
        <View style={s.card}><Text style={s.label}>HOW ARE YOU FEELING?</Text><View style={s.emotions}>{emotions.map(([n])=><Pressable key={n} onPress={()=>setEmotion(n)} style={[s.emotion,emotion===n&&s.selected]}><Text style={s.emotionText}>{n}</Text></Pressable>)}</View>{emotion&&<View style={s.pause}><Text style={s.title}>{emotion==='Angry'?'Let’s come back to center.':'Thank you for checking in.'}</Text><Text style={s.muted}>{emotion==='Angry'?'You don’t have to respond from the hottest version of yourself.':'Notice where you are. You don’t have to force the next moment.'}</Text><Pressable style={s.primary} onPress={()=>setEmotion(null)}><Text style={s.white}>Take This Moment</Text></Pressable></View>}</View>
      </>}
      {tab==='Calendar'&&<View style={s.card}><Text style={s.label}>MY REMINDERS</Text>{appointments.map((a,i)=><View key={i} style={s.appointment}><View style={s.dot}/><View style={{flex:1}}><Text style={s.title}>{a.title}</Text><Text style={s.muted}>{a.date} · {a.time}</Text><Text style={s.tag}>{a.type}</Text></View></View>)}<Pressable style={s.primary} onPress={()=>setAddOpen(true)}><Text style={s.white}>＋ Remember Something</Text></Pressable></View>}
      {tab==='Becoming'&&<View style={s.card}><Text style={s.label}>MY BECOMING</Text><Text style={s.title}>What are you carrying forward?</Text><TextInput value={reflection} onChangeText={setReflection} multiline placeholder="Write a thought, realization, or next step…" style={s.textArea}/><Pressable style={s.primary} onPress={()=>Alert.alert('Saved','Your reflection is saved in this prototype.')}><Text style={s.white}>Save Reflection</Text></Pressable></View>}
      {tab==='Profile'&&<View style={s.card}><Text style={s.label}>MY VILLAGE</Text><Text style={s.title}>{place}</Text><Text style={s.muted}>{places.find(p=>p[0]===place)?.[1]}</Text><Pressable style={s.secondary} onPress={()=>setPlacesOpen(true)}><Text style={s.dark}>Wander somewhere else</Text></Pressable></View>}
    </ScrollView>
    <View style={s.nav}>{['Home','Calendar','Becoming','Profile'].map(n=><Pressable key={n} onPress={()=>setTab(n)}><Text style={[s.navText,tab===n&&s.active]}>{n}</Text></Pressable>)}</View>
    <Modal visible={placesOpen} transparent animationType="fade"><View style={s.backdrop}><View style={s.modal}><Text style={s.modalTitle}>Where would you like to wander?</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.placeRail}>{places.map(([n,,bg])=><Pressable key={n} style={[s.placeChoice,{backgroundColor:bg},place===n&&s.placeSelected]} onPress={()=>{setPlace(n);setPlacesOpen(false)}}><VillageVisual type={n}/><Text style={s.placeChoiceTitle}>{n}</Text><Text style={s.choiceHint}>{places.find(p=>p[0]===n)?.[1]}</Text>{n==='Webspace'&&<Text style={s.webspaceChoiceHint}>tap here to enter</Text>}</Pressable>)}</ScrollView><View style={s.modalActions}><Pressable style={s.webspaceAction} onPress={openWebspace}><Text style={s.webspaceActionText}>↗ Enter Webspace</Text></Pressable><Pressable style={s.secondary} onPress={()=>setPlacesOpen(false)}><Text style={s.dark}>Stay here awhile</Text></Pressable></View></View></View></Modal>
    <Modal visible={addOpen} transparent animationType="slide"><View style={s.backdrop}><View style={s.modal}><Text style={s.modalTitle}>Remember Something</Text><TextInput style={s.input} placeholder="Appointment name" value={title} onChangeText={setTitle}/><TextInput style={s.input} placeholder="Date" value={date} onChangeText={setDate}/><TextInput style={s.input} placeholder="Time" value={time} onChangeText={setTime}/><Pressable style={s.primary} onPress={add}><Text style={s.white}>Save Reminder</Text></Pressable><Pressable style={s.secondary} onPress={()=>setAddOpen(false)}><Text style={s.dark}>Cancel</Text></Pressable></View></View></Modal>
  </SafeAreaView>;
}

const s=StyleSheet.create({
 safe:{flex:1},page:{padding:20,paddingBottom:110},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:18},headerBrand:{flex:1,paddingRight:10},brand:{fontSize:10,letterSpacing:2.2,fontWeight:'800',color:'#68827C'},heading:{fontSize:30,fontWeight:'800',color:'#244744',marginTop:4},webspaceLink:{alignSelf:'flex-start',marginTop:9,paddingHorizontal:13,paddingVertical:7,borderRadius:18,backgroundColor:'rgba(255,255,255,.78)',borderWidth:1,borderColor:'rgba(36,71,68,.12)'},webspaceLinkText:{fontSize:12,fontWeight:'800',color:'#244744',letterSpacing:.4},hero:{paddingVertical:14,marginBottom:6},eyebrow:{fontSize:10,letterSpacing:2,fontWeight:'800',color:'#66817A',marginBottom:10},motivation:{fontSize:27,lineHeight:35,fontWeight:'800',color:'#244744'},muted:{color:'#637773',fontSize:14,lineHeight:21,marginTop:7},heroPlace:{alignItems:'center',paddingVertical:8,marginBottom:14},placeName:{fontSize:18,fontWeight:'800',color:'#315F5D',marginTop:2},placeHint:{fontSize:11,letterSpacing:1.5,textTransform:'uppercase',color:'#78918C',marginTop:3},card:{backgroundColor:'rgba(255,255,255,.86)',borderRadius:24,padding:18,marginBottom:14},label:{fontSize:10,letterSpacing:1.8,fontWeight:'900',color:'#648079',marginBottom:9},title:{fontSize:18,fontWeight:'800',color:'#244744'},tag:{alignSelf:'flex-start',backgroundColor:'#EFF5F2',color:'#496760',borderRadius:20,paddingHorizontal:10,paddingVertical:5,marginTop:8,fontSize:10,fontWeight:'800'},row:{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:10},primary:{backgroundColor:'#244744',paddingHorizontal:16,paddingVertical:13,borderRadius:14,alignItems:'center',marginTop:12},secondary:{backgroundColor:'#E6F0EC',paddingHorizontal:16,paddingVertical:13,borderRadius:14,alignItems:'center',marginTop:8},white:{color:'#fff',fontWeight:'800'},dark:{color:'#244744',fontWeight:'800'},pause:{backgroundColor:'#F1F7F4',borderRadius:18,padding:15,marginTop:14},next:{color:'#244744',fontSize:15,lineHeight:22,fontWeight:'800',marginTop:12},emotions:{flexDirection:'row',flexWrap:'wrap',gap:8},emotion:{width:'31%',minWidth:90,paddingVertical:13,borderRadius:15,backgroundColor:'#F1F6F3',alignItems:'center'},selected:{borderWidth:2,borderColor:'#244744',backgroundColor:'#E2F0EB'},emotionText:{fontSize:12,fontWeight:'800',color:'#49625D'},appointment:{flexDirection:'row',gap:12,alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E6EEEB'},dot:{width:11,height:11,borderRadius:99,backgroundColor:'#6F9D8D'},textArea:{minHeight:140,marginTop:15,borderWidth:1,borderColor:'#CBDDD7',borderRadius:14,padding:13,textAlignVertical:'top',backgroundColor:'#fff',fontSize:16},nav:{position:'absolute',left:12,right:12,bottom:12,height:68,borderRadius:24,backgroundColor:'rgba(255,255,255,.95)',flexDirection:'row',justifyContent:'space-around',alignItems:'center'},navText:{fontSize:12,color:'#82918D',fontWeight:'700'},active:{color:'#244744',fontWeight:'900'},backdrop:{flex:1,backgroundColor:'rgba(18,43,40,.35)',justifyContent:'flex-end'},modal:{backgroundColor:'#F7FCF9',borderTopLeftRadius:30,borderTopRightRadius:30,padding:20,maxHeight:'90%'},modalTitle:{fontSize:23,fontWeight:'800',color:'#244744',marginBottom:15},placeRail:{paddingBottom:8,gap:12},placeChoice:{width:210,minHeight:260,borderRadius:24,padding:15,alignItems:'center',justifyContent:'center'},placeSelected:{borderWidth:2,borderColor:'#244744'},placeChoiceTitle:{fontSize:16,fontWeight:'800',color:'#315F5D',marginTop:4,textAlign:'center'},choiceHint:{fontSize:12,color:'#647773',textAlign:'center',lineHeight:18,marginTop:4},webspaceChoiceHint:{fontSize:11,fontWeight:'800',color:'#315F5D',marginTop:8,letterSpacing:.5},modalActions:{marginTop:4},webspaceAction:{backgroundColor:'#DDEEE9',paddingHorizontal:16,paddingVertical:13,borderRadius:14,alignItems:'center',marginTop:4},webspaceActionText:{color:'#244744',fontWeight:'900'},input:{borderWidth:1,borderColor:'#CBDDD7',borderRadius:13,padding:13,marginBottom:9,backgroundColor:'#fff',fontSize:16},
 visual:{width:190,height:145,alignItems:'center',justifyContent:'center',position:'relative'},visualSmall:{width:62,height:62,transform:[{scale:.36}],marginRight:-64,marginBottom:-40},cloudLarge:{position:'absolute',bottom:15,width:170,height:42,borderRadius:50,backgroundColor:'#FAFDFC',shadowColor:'#5D8D86',shadowOpacity:.12,shadowRadius:18,shadowOffset:{width:0,height:8}},house:{position:'absolute',bottom:42,width:92,height:62,backgroundColor:'#F1E5D7',borderRadius:2,shadowColor:'#47645F',shadowOpacity:.12,shadowRadius:10,shadowOffset:{width:0,height:7}},roof:{position:'absolute',top:-34,left:-8,width:0,height:0,borderLeftWidth:54,borderRightWidth:54,borderBottomWidth:38,borderLeftColor:'transparent',borderRightColor:'transparent',borderBottomColor:'#78948D'},houseWindow:{position:'absolute',top:16,left:14,width:20,height:18,backgroundColor:'#D6F0EC',borderWidth:2,borderColor:'#FFF'},door:{position:'absolute',bottom:0,left:37,width:20,height:34,backgroundColor:'#6F817B',borderTopLeftRadius:9,borderTopRightRadius:9},wand:{position:'absolute',bottom:18,left:34,width:88,height:5,backgroundColor:'#B8996E',borderRadius:5,transform:[{rotate:'-14deg'}]},wandRing:{position:'absolute',right:-13,top:-12,width:30,height:30,borderWidth:2,borderColor:'#B8996E',borderRadius:20},bubble:{position:'absolute',width:104,height:104,borderRadius:60,borderWidth:2,borderColor:'rgba(255,255,255,.95)',backgroundColor:'rgba(190,242,236,.24)',shadowColor:'#5CA5A4',shadowOpacity:.16,shadowRadius:20,shadowOffset:{width:0,height:8}},bubbleGlow:{position:'absolute',width:24,height:14,borderRadius:20,borderTopWidth:3,borderTopColor:'#FFF',left:67,top:29,transform:[{rotate:'-25deg'}]},tinyBubble:{position:'absolute',width:13,height:13,borderRadius:10,borderWidth:1,borderColor:'rgba(255,255,255,.8)',right:30,top:22},treeTrunk:{position:'absolute',bottom:17,width:20,height:82,backgroundColor:'#80664F',borderRadius:10},treeCanopy:{position:'absolute',bottom:68,width:132,height:78,borderRadius:70,backgroundColor:'#609376',shadowColor:'#3E765E',shadowOpacity:.14,shadowRadius:16,shadowOffset:{width:0,height:8}},leaf:{position:'absolute',width:14,height:25,borderRadius:14,backgroundColor:'#87B993'},leaf1:{top:31,left:54,transform:[{rotate:'-30deg'}]},leaf2:{top:21,right:50,transform:[{rotate:'35deg'}]},leaf3:{top:70,left:34,transform:[{rotate:'-55deg'}]},leaf4:{top:64,right:32,transform:[{rotate:'55deg'}]},fallingLeaf:{position:'absolute',width:10,height:18,borderRadius:10,backgroundColor:'#78A984'},fall1:{top:42,right:15,transform:[{rotate:'28deg'}]},fall2:{top:76,left:14,transform:[{rotate:'-40deg'}]},photo:{position:'absolute',width:78,height:96,backgroundColor:'#FFF',padding:7,shadowColor:'#405F5B',shadowOpacity:.16,shadowRadius:12,shadowOffset:{width:0,height:8}},photo1:{transform:[{rotate:'-9deg'},{translateX:-24}]},photo2:{transform:[{rotate:'9deg'},{translateX:24}]},photoImage1:{flex:1,backgroundColor:'#C5E4DC'},photoImage2:{flex:1,backgroundColor:'#E8D6C7'},window:{width:160,height:116,borderRadius:24,borderWidth:7,borderColor:'#F5F8F5',backgroundColor:'#284652',overflow:'hidden',position:'relative'},moon:{position:'absolute',width:34,height:34,borderRadius:20,backgroundColor:'#F7EBCF',right:18,top:18},star1:{position:'absolute',width:4,height:4,borderRadius:3,backgroundColor:'#FFF',left:25,top:30},star2:{position:'absolute',width:4,height:4,borderRadius:3,backgroundColor:'#FFF',left:65,top:54},windowGlow:{position:'absolute',bottom:0,left:0,right:0,height:30,backgroundColor:'rgba(180,230,215,.14)'},ribbon:{position:'absolute',width:125,height:34,borderRadius:50,borderWidth:5},ribbon1:{borderColor:'#7DC6B9',borderLeftColor:'transparent',borderBottomColor:'transparent',transform:[{rotate:'28deg'},{translateX:-18}]},ribbon2:{borderColor:'#D7A7A6',borderLeftColor:'transparent',borderBottomColor:'transparent',transform:[{rotate:'208deg'},{translateX:18}]},connectLight:{width:25,height:25,borderRadius:20,backgroundColor:'#F7E5D8',shadowColor:'#E3BFA8',shadowOpacity:.4,shadowRadius:12},hand:{position:'absolute',bottom:30,width:72,height:32,borderRadius:40,backgroundColor:'#D9B9A6'},hand1:{left:30,transform:[{rotate:'-14deg'}]},hand2:{right:30,transform:[{rotate:'14deg'}]},supportGlow:{position:'absolute',top:14,width:55,height:55,borderRadius:30,backgroundColor:'#FFF5D7',shadowColor:'#E7C878',shadowOpacity:.55,shadowRadius:24}
});
