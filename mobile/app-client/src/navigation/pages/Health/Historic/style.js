import { StyleSheet, Platform } from "react-native";


const styles = StyleSheet.create({
    descriptionContent: {
        flex: 0.1,
        marginTop: Platform.OS == 'ios' ? 40 : 30,
        marginLeft: 5,
    },
    seacthContent: {
        flex: 1,
    },
    searchBox: {
        marginTop: Platform.OS == 'ios' ? 50 : 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { widht: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    actionsContent: {
        widht: '100%',
        flexDirection: "row",
        marginTop: 15,
        marginLeft: 5
    },

    orderName: {
        width: '50%',

        justifyContent: 'center'

    },
    qrCode: {
        width: '50%',

        alignItems: 'flex-end',
        padding: 1
    },
    code: {
         width: 40,
         height: 30, 
         borderRadius: 5, 
         right: 5, 
         display:'flex',
         flexDirection: 'row', 
         backgroundColor: '#6CA8DA', 
         alignItems: 'center',
        justifyContent:'center'
    },
    cardsContent:{
        flex:1,
        marginTop:5,
        flexDirection:'row',
        flexWrap: 'wrap',
        
    },
    card:{
        width:170,
        height:100,
        marginTop:20,
        marginLeft:13,
        borderWidth:1,
        shadowColor: '#ccc',

    }
})

export default styles;