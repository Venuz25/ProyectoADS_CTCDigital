using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace ApiCTC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MascotasController : ControllerBase
    {
        private readonly string connectionString = "server=localhost;database=ctc;user=root;";

        [HttpGet("estadisticas")]
        public IActionResult GetEstadisticas()
        {
            int total = 0;
            int adoptados = 0;

            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                // Total de rescatados
                var totalCmd = new MySqlCommand("SELECT COUNT(*) FROM mascota", connection);
                total = Convert.ToInt32(totalCmd.ExecuteScalar());

                // Total de adoptados
                var adoptadosCmd = new MySqlCommand("SELECT COUNT(*) FROM mascota WHERE estadoAdopcion = 'Adoptado'", connection);
                adoptados = Convert.ToInt32(adoptadosCmd.ExecuteScalar());
            }

            return Ok(new { total, adoptados });
        }
    }
}
