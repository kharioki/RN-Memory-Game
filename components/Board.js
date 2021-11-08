import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const Card = ({ card, onPress }) => {
  console.log(card.source)
  return (
    <View style={styles.card}>
      <Image style={styles.front} source={require(`../assets/img/cover.jpg`)} resizeMode="cover" />
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.back} source={require('../assets/img/cover.jpg')} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  )
}

const Board = ({ cards }) => {

  // render grid rows
  const renderRows = () => {
    const rows = []
    for (let i = 0; i < 8; i++) {
      rows.push(
        <View key={i} style={styles.row}>
          {renderCells(i)}
        </View>
      )
    }
    return rows
  }

  const renderCells = (rowIndex) => {
    const cells = []
    for (let i = 0; i < 4; i++) {
      let index = rowIndex * 4 + i
      cells.push(
        <Card key={i} card={cards[index]} onPress={() => console.log('pressed')} />
      )
    }
    return cells
  }

  return (
    <View style={styles.gridContainer}>
      {renderRows()}
    </View>
  )
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'column',
    width: '100%',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    height: 80,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    margin: 5,
  },
  front: {
    height: 60,
    width: 60,
  },
  back: {
    height: 60,
    width: 60,
  },

})

export default Board
