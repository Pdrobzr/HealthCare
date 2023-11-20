import React, { Fragment, useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import Balloon from './Balloon';
import { FontAwesome } from '@expo/vector-icons';
import blogFetch from '../../../axios/config';

const KEYBOARD_AVOIDING_BEHAVIOR = Platform.select({
    ios: 'padding',
    android: 'height',
});
export default Chat = ({ navigation, route }) => {

    const { nomeEmpresa, id } = route.params;

    const [comentarios, setComentarios] = useState([]);
    const [message, setMessage] = useState('')
    const backHome = async () => {
        navigation.navigate('MainContainer');
    };

    // const renderChat = ({ item }) => (
    //     <Balloon message={item.conteudoComentario} name={item.Usuario.nomeUsuario} date={item.dataPublicacao} />
    // );

    useEffect(() => {
        const listarComentarios = async (id) => {
            const response = await blogFetch.get(`/listarComentarios/${id}`);
            const data = response.data;
            setComentarios(data);
        }
        listarComentarios(id);
    }, []);

    return (
        <Fragment>
            <View style={{ width: '100%', height: '13%', backgroundColor: 'white', top: '0%', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ left: 8, top: '7%', width: '23%', height: '50%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={backHome}>
                        <FontAwesome
                            name="angle-left"
                            size={30}
                            color={'black'}
                        />

                    </TouchableOpacity>

                </View>
                <View style={{ left: 63, top: '7%', width: '23%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{

                        }}>{nomeEmpresa}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {comentarios.map((comentario) => (
                    <View>
                        <Balloon message={comentario.conteudoComentario} name={comentario.Usuario.nomeUsuario} date={comentario.dataPublicacao} />
                    </View>
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={KEYBOARD_AVOIDING_BEHAVIOR}
                keyboardVerticalOffset={76}>
                <SafeAreaView>
                    <View style={styles.messageTextInputContainer}>
                        <TextInput
                            style={styles.messageTextInput}
                            placeholder="Digite sua mensagem..."
                            placeholderTextColor={"white"}
                            multiline
                            value={message} onChangeText={setMessage}
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            disabled={!message}
                            onPress={() => null}>
                            <Text style={styles.sendButtonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    scrollViewContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        top: 50,
    },
    sendButton: {
        backgroundColor: 'rgba(39, 161, 245, 0.8)',
        color: 'white',
        height: 40,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 5,
    },
    sendButtonText: {
        color: 'white',
    },
    messageTextInputContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: 'transparent',
        borderTopColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 8
    },
    messageTextInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 90,
        paddingHorizontal: 12,
        fontSize: 17,
        paddingTop: 8,
        marginHorizontal: 5,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 20,
    },

});


