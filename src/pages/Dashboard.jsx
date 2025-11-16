import React from "react";
import { Grid, Box, Stack} from "@mui/material";

import GradeCard from "../components/ui/GradeCard";
import MetricCard from "../components/ui/MetricCard";
import DescriptionCard from "../components/ui/DescriptionCard";
import LiveQuoteCard from "../components/ui/LiveQuoteCard";
import PriceChartCard from "../components/ui/PriceChartCard";
import { useLocation, useParams } from "react-router-dom";

export default function Dashboard() {
  const {state: data } = useLocation()
  const {symbol} = useParams()

  return (
    <Box sx={{ p: 4, bgcolor: "#F3F4F6", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* TOP ROW METRICS */}
        <Stack direction='row' spacing={6}>
          <GradeCard grade={data.grade}/>
          <MetricCard
            title="Market Cap"
            value={data.market_cap?.value}
            condition={data.market_cap?.condition}
          />
          <MetricCard
            title="Liquidity"
            value={data.liquidity?.value}
            condition={data.liquidity?.condition}
          />
          <MetricCard
            title="Volatility"
            value={data.volatility?.value}
            condition={data.volatility?.condition}
          />
        </Stack>

        {/* Curr Price + DESCRIPTION ROW */}
        <Box display='flex' flexDirection='column' gap={2}>
          <DescriptionCard name={data.symbol} description={data.description} />
          <LiveQuoteCard price_data={data.price_data}/>
        </Box>

        <Grid item xs={12} md={8}>
          <PriceChartCard price_data={data.price_data}>
          </PriceChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}

// <Box sx={{ bgcolor: "#585a5cff", minHeight: "100vh" }}>
//       {/* Header */}
//       <AppBar position="static" color="primary" sx={{ mb: 2 }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             Stock Tracker
//           </Typography>

//           <Grid container spacing={2} sx={{ width: "auto" }}>
//             <Typography variant="subtitle2">
//               {data?.symbol || symbol}
//             </Typography>
//           </Grid>
//         </Toolbar>
//       </AppBar>

//       {/* Main content */}
//       <Box
//         p={3}
//         sx={{
//           py: 6,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//           justifyContent: "center",
//           bgcolor: "#8a8a8bff",
//           minHeight: "70vh",
//         }}
//       >
//         <Grid container spacing={3}>
//           {/* Grade Card */}
//           <Grid item xs={12} md={4}>
//             <Card
//               sx={{
//                 height: "400px",
//                 p: 2,
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <CardContent sx={{ width: "200px" }}>
//                 <Typography
//                   variant="h3"
//                   fontWeight="bold"
//                   textAlign="center"
//                   fontSize="100px"
//                 >
//                   {data?.grade || "—"}
//                 </Typography>

//                 <Typography
//                   variant="h6"
//                   color="text.secondary"
//                   textAlign="center"
//                   fontSize="30px"
//                   sx={{ mb: 2 }}
//                 >
//                   {(data?.symbol || symbol)?.toUpperCase()}
//                 </Typography>

//                 <Typography variant="body1" textAlign="center">
//                   Market Cap Condition: {data?.market_cap?.condition}
//                 </Typography>
//                 <Typography variant="body1" textAlign="center">
//                   Volatility: {data?.volatility?.condition}
//                 </Typography>
//                 <Typography variant="body1" textAlign="center">
//                   Liquidity: {data?.liquidity?.condition}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Price Chart Placeholder */}
//           <Grid item xs={12} md={8}>
//             <Paper sx={{ p: 2, height: "400px" }}>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 {data?.symbol || symbol} Price History
//               </Typography>

//               <Box sx={{ width: "800px", height: 350 }}>
//                 <Typography>Price chart coming soon...</Typography>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* X News List */}
//       <Container sx={{ my: 4 }}>
//         <Paper elevation={3} sx={{ p: 2 }}>
//           <Xlist theme="light" listId="1977888287458045976" />
//         </Paper>
//       </Container>

//       {/* Info / FAQs */}
//       <Container className="content" sx={{ py: 6 }}>
//         <Typography variant="h4" gutterBottom>
//           Info / FAQs
//         </Typography>

//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6">What to look for</Typography>
//             <Typography variant="body1">
//               Market cap, volatility, and liquidity are the three major factors
//               graded.
//             </Typography>
//           </CardContent>
//         </Card>

//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6">The metric of the algorithm</Typography>
//             <Typography variant="body1">
//               The algorithm calculates a reliability score and assigns grades
//               from F to A.
//             </Typography>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
