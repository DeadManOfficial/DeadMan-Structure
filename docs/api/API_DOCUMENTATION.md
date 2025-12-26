# API Documentation

## Overview

Dead Man Structure provides a RESTful API for managing agents, teams, missions, and governance operations.

## Base URL

```
http://localhost:4000/api
```

## Authentication

Most endpoints require authentication via Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:4000/api/missions
```

## Endpoints

### Health Check

**GET** `/health`

Public health check endpoint.

**Response:**
```json
{
  "status": "operational",
  "timestamp": "2025-12-25T12:00:00.000Z",
  "uptime": 123.456
}
```

### Council (Public)

**GET** `/api/council`

Retrieve council information (no authentication required).

**Response:**
```json
{
  "members": [...],
  "teams": [...]
}
```

### Missions (Protected)

**GET** `/api/missions`

List all missions (requires authentication).

**Response:**
```json
{
  "missions": [
    {
      "id": "uuid",
      "codeName": "MISSION_NAME",
      "description": "Mission description",
      "status": "PENDING",
      "priority": "HIGH",
      "progress": 50
    }
  ]
}
```

### Governance (Protected)

**GET** `/api/governance`

Retrieve governance information (requires authentication).

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}
```

## Common Status Codes

- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Currently not enforced. Consider implementing for production.

## Versioning

Current API version: v1.0

---

*Generated: 2025-12-25*
*Dead Man Structure - Gemini HQ*
