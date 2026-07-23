import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

function ReviewsSection() {
  return (
    <Box
      sx={{
        py: 12,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={800}
          mb={2}
        >
          Community Reviews
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 8,
            lineHeight: 1.8,
            fontSize: "1.08rem",
          }}
        >
          We're just getting started. Once users begin using ElevateHire,
          genuine reviews and ratings will appear here.
        </Typography>

        <Card
          sx={{
            maxWidth: 650,
            mx: "auto",
            borderRadius: 5,
            textAlign: "center",
            p: 5,
          }}
        >
          <CardContent>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                mb: 3,
                bgcolor: "primary.main",
              }}
            >
              <RateReviewOutlinedIcon sx={{ fontSize: 42 }} />
            </Avatar>

            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
            >
              No Reviews Yet
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              Reviews will be collected from real users after launch.
              Fake testimonials have been removed to keep the platform
              authentic.
            </Typography>

            <Stack
              spacing={2}
              alignItems="center"
            >
              <Rating
                value={5}
                readOnly
                size="large"
              />

              <Button
                variant="contained"
                size="large"
                disabled
                sx={{
                  px: 5,
                  borderRadius: 3,
                }}
              >
                Review System Coming Soon
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ReviewsSection;