import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'



const Balloon = ({ message }) => {

  return (
    <View>
      <View style={styles.bubbleWrapper}>
        <View style={styles.bubbleWrapperSent}>
          <View style={styles.balloon}>
            <View style={styles.balloonSent}>
              <Text style={styles.balloonText}>
                <Text style={styles.balloonTextSent} >{message}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bubbleWrapper}>
        <View style={styles.bubbleWrapperReceived}>
          <View style={styles.balloon}>
            <View style={styles.balloonReceived}>
              <Text style={styles.balloonText}>
                <Text style={styles.balloonTextReceived} >{message}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>


  )
}

const styles = StyleSheet.create({
  bubbleWrapper: {
    flexDirection: 'column',

  },
  bubbleWrapperSent: {
    alignSelf: 'flex-end',
    marginLeft: 40
  },
  bubbleWrapperReceived: {
    alignSelf: 'flex-start',
    marginRight: 40,
  },
  balloon: {
    paddingHorizontal: 8,
    paddingVertical: 8,


  },
  balloonSent: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  balloonReceived: {
    backgroundColor: "rgba(39, 161, 245, 0.8)",
    borderRadius: 20,
  },
  balloonText: {
    fontSize: 18,
  },
  balloonTextSent: {
    color: "black",
  },
  balloonTextReceived: {
    color: "white",
  },
})


export default Balloon