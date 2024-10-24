// import { getUserProfile } from '@/api/profile';
// import {
//   HydrationBoundary,
//   QueryClient,
//   dehydrate,
// } from '@tanstack/react-query';
// import { ProfileContents } from './ProfileContes';

// export const ProfilePage = async () => {
//   const userId = '10';
//   console.log(userId);
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery({
//     //서버컴포넌트에서 사용되는 prefetchQuery
//     queryKey: ['userProfile', userId],
//     queryFn: ({ queryKey }) => getUserProfile(queryKey[1]),
//   });
//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <div className='flex flex-col gap-20'>
//       <HydrationBoundary state={dehydratedState}>
//         {/**prefetch한 데이터 사용할 범위 */}
//         <ProfileContents userId={userId} />
//       </HydrationBoundary>
//     </div>
//   );
// };
