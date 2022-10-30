import { StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import CommentModal from './CommentModal';

const Modal = () => {
  const modalState = useSelector((state) => state.modal);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    } else {
      bottomSheetRef.current.close();
    }
  }, [modalState]);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleHeight={40}>
      <View style={styles.container}>
        <CommentModal post={modalState.data} />
      </View>
    </BottomSheet>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
