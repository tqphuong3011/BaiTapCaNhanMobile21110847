import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import CommonLayout from '@components/layouts/common.layout';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AppDropdown from '@components/ui/AppDropdown';
import AppButton from '@components/ui/AppButton';
import { router } from 'expo-router';

const dropdownItems = [
   {
      id: '1',
      content: <Text style={{ color: '#1f2937' }}>Cash on delivery</Text>,
      onPress: () => console.log('Selected Option 1'),
   },
   {
      id: '2',
      content: <Text style={{ color: '#1f2937' }}>VNpay</Text>,
      onPress: () => console.log('Selected Option 2'),
   },
];

const CheckoutAddressScreen = () => {
   return (
      <CommonLayout
         title="Checkout Address"
         titleStyles="text-lg"
         className="h-full bg-white"
      >
         <View className="flex justify-between flex-1">
            <View className="p-5 mt-2">
               <View>
                  <Text className="text-xl font-TenorSans-Regular uppercase text-[#888888]">
                     Shipping address
                  </Text>

                  <View className="flex flex-row items-center justify-between p-3">
                     <View className="w-[200px]">
                        <Text className="text-xl font-TenorSans-Regular">
                           Iris Watson
                        </Text>
                        <Text className="font-TenorSans-Regular text-[#333]/80 text-wrap mt-2 text-base">
                           606-3727 Ullamcorper. Street Roseville NH 11523
                        </Text>
                        <Text className="font-TenorSans-Regular text-[#333]/80 mt-1 text-base">
                           (786) 713-8616
                        </Text>
                     </View>
                     <TouchableOpacity>
                        <FeatherIcon name="edit" size={26} color="#3338" />
                     </TouchableOpacity>
                  </View>
               </View>

               <View className="mt-5">
                  <Text className="text-xl font-TenorSans-Regular uppercase text-[#888888]">
                     Payment method
                  </Text>

                  <View className="p-3">
                     <AppDropdown
                        items={dropdownItems}
                        placeholder="Select payment method"
                     />
                  </View>
               </View>
            </View>

            <View>
               <AppButton
                  title="Place order"
                  onPress={() => {
                     router.push('checkout/place-order');
                  }}
                  containerStyles="bg-black py-3"
                  icon={
                     <FeatherIcon
                        name="chevrons-right"
                        size={24}
                        color="#ccc"
                     />
                  }
                  iconPosition="right"
               />
            </View>
         </View>
      </CommonLayout>
   );
};

export default CheckoutAddressScreen;
