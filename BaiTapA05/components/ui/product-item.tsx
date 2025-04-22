import FeatherIcon from 'react-native-vector-icons/Feather';
import { ProductItemType } from '~/src/infrastructure/types/product.type';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '~/src/infrastructure/redux/store';

type ProductItemProps = {
   id: string;
   title: string;
   description?: string;
   price: number;
   imageUrl: string;
   slug: string;
   category: string;
   brand: string;
};

const ProductItem = (props: ProductItemProps) => {
   const dispatch = useDispatch();

   return (
      <View>
         <View className="relative">
            <Image
               source={{
                  uri: props.imageUrl,
               }}
               style={{ width: '100%', height: 240 }}
               resizeMode="cover"
            />

            <TouchableOpacity>
               <FontAwesomeIcon
                  name="heart-o"
                  size={20}
                  color="#DD855F"
                  className="absolute bottom-2 right-2 "
               />
            </TouchableOpacity>
         </View>
         <View className="px-1 mt-1">
            <Text className="text-base font-TenorSans-Regular">
               {props.title}
            </Text>
            <Text className="text-sm font-TenorSans-Regular">
               {props.description}
            </Text>
            <Text className="mt-2 text-xl text-secondary font-TenorSans-Regular">
               ${props.price}
            </Text>
         </View>
      </View>
   );
};

export default ProductItem;
