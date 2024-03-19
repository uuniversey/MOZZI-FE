import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RecipeController {

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/recipe")
    @ResponseBody
    public String getRecipe() {
        // 데이터베이스에서 id가 1인 food_name 가져오기
        Food food = foodRepository.findById(1L).orElse(null);
        
        if (food != null) {
            return food.getFoodName();
        } else {
            return "No food found with id 1";
        }
    }
}
