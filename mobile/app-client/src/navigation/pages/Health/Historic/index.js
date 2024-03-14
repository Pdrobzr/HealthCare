
import { View, TextInput, Animated, ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';

const HistoricScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../../../components/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../../../../components/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../../../components/fonts/Montserrat-Medium.ttf'),
    })
    if (!fontsLoaded) {
        return undefined;
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', padding: 15 }}>
            <View style={styles.descriptionContent}>
                <Text style={{ fontSize: 35, fontFamily: 'Montserrat-Bold', color: '#4A4444' }}>Sua Sáude</Text>
                <View style={{ height: 50 }}>
                    <Text style={{ fontSize: 14, color: '#A4A4A4' }}>
                        Aqui você pode ver todo o seu histórico médico,
                        que foi compartilhado com você,
                        livrando-se de papéis e organizando melhor sua saúde
                    </Text>
                </View>
            </View>
            <View style={styles.searchContent}>
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder='Pesquisar'
                        placeholderTextColor='#000'
                        autoCapitalize='none'
                        style={{ flex: 1, padding: 0 }}
                    />
                    <FontAwesome
                        name="search"
                        size={15}
                        color={'#000'}
                    />
                </View>
            </View>
            <View style={styles.actionsContent}>
                <View style={styles.orderName}>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#4A4444' }}>Exames</Text>
                        <FontAwesome style={{ marginLeft: 10, marginTop: 2 }} name="sort" size={15} color={'#4A4444'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.qrCode}>
                    <TouchableOpacity style={styles.code}>
                        <FontAwesome name="qrcode" size={25} color={'#ffff'} />
                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView style={{flex:1}}>
                <View style={styles.cardsContent}>
                    <View style={styles.card}>
                        
                    </View>
                    <View style={styles.card}>
                    <Text>teste</Text>
                    </View>
                    <View style={styles.card}>
                    <Text>teste</Text>
                    </View>
                    <View style={styles.card}>
                    <Text>teste</Text>
                    </View>
                    <View style={styles.card}>
                    <Text>teste</Text>
                    </View>
                    <View style={styles.card}>
                    <Text>teste</Text>
                    </View>
                    <View style={styles.card}>
                    <Text>teste</Text>
                    </View>
                    
                </View>
            </ScrollView>
        </View>
    )
}


export default HistoricScreen;