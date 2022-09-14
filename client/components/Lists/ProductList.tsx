import {StyleSheet, FlatList, ListRenderItem, ScrollView} from 'react-native';
import React from 'react';

interface Props {
  data: any[];
  renderItem?: ListRenderItem<any>;
  refreshing: boolean;
}

const ProductList: React.FC<Props> = ({data, renderItem, refreshing}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.list}>
      <FlatList
        refreshing={refreshing}
        style={styles.list}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    height: '100%',
  },
});
