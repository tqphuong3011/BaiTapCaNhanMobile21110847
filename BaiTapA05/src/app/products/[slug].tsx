import { useGetProductBySlugAsyncQuery } from '~/src/infrastructure/redux/apis/product.api';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ProductLayout from '@components/layouts/product.layout';
import { router, useLocalSearchParams } from 'expo-router';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icons from '@constants/svg-icons';
import ProductItem from '@components/ui/product-item';
import CarouselItems from '@components/ui/carousel-items';
import CarouselItemsTest from '@components/ui/carousel-items-test';
import { useDispatch } from 'react-redux';
import { useGetProductsAsyncQuery } from '~/src/infrastructure/redux/apis/product.api';
import {
   ProductCategoryType,
   ProductItemType,
} from '~/src/infrastructure/types/product.type';
import COLORS from '@constants/colors';
import { cn } from '~/lib/utils';

import { skipToken } from '@reduxjs/toolkit/query';

import { ImageType } from '~/src/infrastructure/types/common/img.type';

const ProductDetailScreen = () => {
   const { slug } = useLocalSearchParams();

   const [productsSameCategory, setProductsSameCategory] = useState<
      ProductItemType[]
   >([]);
   const [product, setProduct] = useState({
      productID: '',
      product_slug: '',
      product_imgs: [] as ImageType[],
      product_name: '',
      product_colors: [] as string[],
      product_sizes: [] as string[],
      product_price: 0,
      description: '',
      product_category: {} as ProductCategoryType,
   });

   const {
      data: productsResponse,
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetProductsAsyncQuery({ _page: 1, _limit: 10 });

   React.useEffect(() => {
      if (productsResponse?.data?.items) {
         const findProduct = productsResponse.data.items.find(
            (item) => item.product_slug === slug,
         );
         if (findProduct) {
            setProduct({
               productID: findProduct._id,
               product_slug: findProduct.product_slug,
               product_imgs: findProduct.product_imgs,
               product_name: findProduct.product_name,
               product_colors: findProduct.product_colors,
               product_sizes: findProduct.product_sizes,
               product_price: findProduct.product_price,
               description: findProduct.product_description,
               product_category: findProduct.product_category,
            });
         }
      }
   }, [productsResponse]);

   //   React.useEffect(() => {
   //     if (productsSameCategoryResponse?.data?.items) {
   //       setProductsSameCategory(productsSameCategoryResponse.data.items);
   //     }
   //   }, [productsSameCategoryResponse]);

   const dispatch = useDispatch();

   const [selectedColor, setSelectedColor] = useState(0);
   const [selectedSize, setSelectedSize] = useState(0);

   const handleAddToCart = () => {
      const {
         productID,
         product_imgs,
         product_colors,
         product_sizes,
         product_price,
         product_name,
         product_slug,
      } = product;

      alert('ADD TO CART SUCCESSFULLY');
   };

   return (
      <ProductLayout>
         {/* CAROUSEL IMAGES */}
         <View className="flex items-center w-full mt-5">
            <CarouselItemsTest
               items={product.product_imgs.map((item) => {
                  return (
                     <Image
                        source={{
                           uri: item.secure_url,
                        }}
                        style={{ width: 341, height: 460 }}
                     />
                  );
               })}
            />
         </View>

         {/* INFO PRODUCT */}
         <View className="relative px-5">
            <Text className="text-2xl uppercase font-TenorSans-Regular">
               {product.product_name}
            </Text>
            <Text className="mt-2 text-lg font-TenorSans-Regular text-[#555555]">
               {product.description}
            </Text>
            <Text className="mt-2 text-2xl font-TenorSans-Regular text-secondary">
               ${product.product_price}
            </Text>
         </View>

         {/* CHOOSE SIZE AND COLOR */}
         <View className="flex flex-row items-center mb-2">
            <View className="flex flex-row items-center p-5">
               <Text className="mr-3 text-lg font-TenorSans-Regular">
                  Color
               </Text>
               {product.product_colors.map((color, index) => {
                  let colorHex = '';

                  switch (color) {
                     case 'GREEN':
                        colorHex = COLORS.Green;
                        break;
                     case 'BROWN':
                        colorHex = COLORS.Brown;
                        break;
                     case 'WHITE':
                        colorHex = COLORS.White;
                        break;
                     case 'YELLOW':
                        colorHex = COLORS.Yellow;
                        break;
                     default:
                        colorHex = '#000'; // Fallback color
                        break;
                  }

                  return (
                     <TouchableOpacity
                        key={color}
                        onPress={() => setSelectedColor(index)}
                        className={cn(
                           index == selectedColor
                              ? 'border border-[#333] rounded-full'
                              : '',
                        )}
                     >
                        {/* // <View key={color} > */}
                        <Icons.ColorCircle
                           innerCircleColor={colorHex}
                           // outerCircleColor={'#333'}
                           width={30}
                           height={30}
                        />
                        {/* // </View> */}
                     </TouchableOpacity>
                  );
               })}
            </View>
            <View className="flex flex-row items-center p-5">
               <Text className="mr-3 text-lg font-TenorSans-Regular">Size</Text>
               <View className="flex flex-row items-center gap-2">
                  {product.product_sizes.map((item, index) => (
                     <TouchableOpacity
                        key={item}
                        onPress={() => setSelectedSize(index)}
                        className={cn(
                           index == selectedSize
                              ? 'border border-[#333] rounded-full'
                              : '',
                        )}
                     >
                        <View
                           className={cn(
                              'w-10 h-10 m-1 rounded-full bg-gray-500 justify-center items-center',
                           )}
                        >
                           <Text className="text-base text-white font-TenorSans-Regular">
                              {item}
                           </Text>
                        </View>
                     </TouchableOpacity>
                  ))}
               </View>
            </View>
         </View>

         {/* BUTTON ADD TO CART */}
         <TouchableOpacity
            className="flex flex-row items-center justify-between bg-black"
            onPress={handleAddToCart}
         >
            <View className="flex flex-row items-center gap-2">
               <FeatherIcon
                  name="plus"
                  size={20}
                  color="#FFF"
                  className="ml-3"
               />
               <Text className="py-5 text-lg text-white uppercase justify-self-start font-TenorSans-Regular">
                  Add to basket
               </Text>
            </View>
            <FeatherIcon name="heart" size={20} color="#FFF" className="mr-5" />
         </TouchableOpacity>

         <View className="px-5 py-10">
            {/* DETAIL PRODUCT */}
            <View className="mb-10">
               <Text className="text-2xl uppercase font-TenorSans-Regular">
                  Materials
               </Text>
               <Text className="mt-4 text-xl font-TenorSans-Regular leading-[1.8] text-[#555555]">
                  We work with monitoring programmes to ensure compliance with
                  safety, health and quality standards for our products.
               </Text>
            </View>

            <View className="mb-5">
               <Text className="text-2xl uppercase font-TenorSans-Regular">
                  Care
               </Text>
               <Text className="mt-4 text-xl leading-[1.8] font-TenorSans-Regular text-[#555555]">
                  To keep your jackets and coats clean, you only need to freshen
                  them up and go over them with a cloth or a clothes brush. If
                  you need to dry clean a garment, look for a dry cleaner that
                  uses technologies that are respectful of the environment.
               </Text>
            </View>

            <View className="m-5">
               <View className="flex flex-row items-center mb-3">
                  <Icons.NotBleachIcon
                     style={styles.icon}
                     width={30}
                     height={30}
                  />
                  <Text className="text-lg font-TenorSans-Regular text-[#555555]">
                     Do not use bleach
                  </Text>
               </View>
               <View className="flex flex-row items-center mb-3">
                  <Icons.NotTumbleDryIcon
                     style={styles.icon}
                     width={30}
                     height={30}
                  />
               </View>
            </View>
            {/* <View className="relative px-5">
            <Text className="text-2xl uppercase font-TenorSans-Regular">
               {product.title}
            </Text>
            <Text className="mt-2 text-lg font-TenorSans-Regular text-[#555555]">
               {product.description}
            </Text>
            <Text className="mt-2 text-2xl font-TenorSans-Regular text-secondary">
               ${product.price}
            </Text>
         </View> */}

            {/* REVIEW PRODUCT */}
            <View className="flex items-center justify-end mt-10 mb-5">
               <Text className="mb-3 text-2xl text-center uppercase font-TenorSans-Regular">
                  REVIEW
               </Text>
               <Icons.SeparateLine />
            </View>

            {/* SAME PRODUCTS */}
            <View className="flex items-center justify-end mt-10 mb-10">
               <Text className="mb-3 text-2xl text-center uppercase font-TenorSans-Regular">
                  You may also like
               </Text>
               <Icons.SeparateLine />
            </View>

            <View className="flex flex-row flex-wrap items-center justify-center gap-3 mx-[-15px]">
               {productsSameCategory.map((item, index) => {
                  return (
                     <TouchableOpacity
                        key={index}
                        onPress={() => {
                           router.push(`/products/${item.product_slug}`);
                        }}
                     >
                        <ProductItem
                           id={item._id}
                           title={item.product_name}
                           description="description"
                           price={item.product_price}
                           imageUrl={item.product_imgs[0].secure_url}
                           slug={item.product_slug}
                           category={item.product_category.category_name}
                           brand={item.product_brand}
                        />
                     </TouchableOpacity>
                  );
               })}
            </View>
         </View>
      </ProductLayout>
   );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
   icon: {
      width: 30,
      height: 30,
      marginRight: 10,
   },
});
