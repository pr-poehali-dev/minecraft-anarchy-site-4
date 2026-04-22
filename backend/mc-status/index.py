import json
import urllib.request
import urllib.error

def handler(event: dict, context) -> dict:
    """Получает статус Minecraft сервера Delland через mcapi.us"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    server_ip = 'delland.hypixel.ws'

    try:
        url = f'https://api.mcsrvstat.us/3/{server_ip}'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode())

        online = data.get('players', {}).get('online', 0)
        max_players = data.get('players', {}).get('max', 0)
        is_online = data.get('online', False)
        version = data.get('version', '1.16.5-1.21.1')
        motd_clean = ''
        if data.get('motd', {}).get('clean'):
            motd_clean = ' '.join(data['motd']['clean'])

        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'online': is_online,
                'players_online': online,
                'players_max': max_players,
                'version': version,
                'motd': motd_clean,
            })
        }

    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'online': False,
                'players_online': 0,
                'players_max': 0,
                'version': '1.16.5-1.21.1',
                'motd': '',
                'error': str(e),
            })
        }
